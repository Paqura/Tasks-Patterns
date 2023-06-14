import { SearchResponse } from 'meilisearch'

import { TSearchResultItem } from '@/components/SearchPage/components/SearchResultsList'

type TObject = Record<string, unknown>

const isObject = (value: unknown): value is TObject => {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const flattenObj = (obj: TObject): TObject => {
    const result: TObject = {}

    for (const [key, value] of Object.entries(obj)) {
        if (isObject(value)) {
            const flattenedObj = flattenObj(value)

            for (const [innerKey, innerValue] of Object.entries(flattenedObj)) {
                result[`${key}.${innerKey}`] = innerValue
            }

            continue
        }

        if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                if (!isObject(value[i]) && !Array.isArray(value[i])) {
                    result[`${key}[${i}]`] = value[i]

                    continue
                }

                const isArray = Array.isArray(value[i])
                const flattenedObj = flattenObj(value[i])

                for (const [innerKey, innerValue] of Object.entries(flattenedObj)) {
                    if (isArray) {
                        result[`${key}[${i}][${innerKey}]`] = innerValue
                    } else {
                        result[`${key}[${i}].${innerKey}`] = innerValue
                    }
                }
            }

            continue
        }

        result[key] = value
    }

    return result
}

const getDescription = (
    query: string,
    data: TObject,
    replacement: { from: string; to: string }
): string => {
    const wordsToSearch = query.split(' ')
    const { from, to } = replacement

    let maxCount = 0
    let resultKey = ''

    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
            let currentCount = 0

            wordsToSearch.forEach((word) => {
                if (value.includes(word)) {
                    currentCount++
                }
            })

            if (currentCount > maxCount) {
                maxCount = currentCount
                resultKey = key
            }
        }
    }

    if (resultKey === from) {
        return String(data[to] ?? '')
    }

    if (resultKey === '') {
        return '-'
    }

    return String(data[resultKey])
}

const getSearchResultItem = (
    query: string,
    type: string,
    data: TObject,
    slug?: string
): TSearchResultItem | undefined => {
    if (type === 'about-page') {
        return {
            title: String(data.title),
            description: getDescription(query, data, { from: 'title', to: 'description' }),
            href: '/about',
        }
    }

    if (type === 'analytic-article') {
        return {
            title: String(data.title),
            description: getDescription(query, data, { from: 'title', to: 'topic' }),
            href: `/analytics/${slug}`,
        }
    }

    if (type === 'news-item' || type === 'webinars-item') {
        const href = type === 'webinars-item' ? `/webinar/${slug}` : `/news/${slug}`

        return {
            title: String(data.title),
            description: getDescription(query, data, { from: 'title', to: 'topic' }),
            href,
        }
    }

    if (type === 'product') {
        return {
            title: String(data.title),
            description: getDescription(query, data, { from: 'title', to: 'subtitle' }),
            href: `/products/${slug}`,
        }
    }

    return undefined
}

export const mapSearchResponseServerData = (
    searchResponse?: SearchResponse | null
): TSearchResultItem[] => {
    if (!searchResponse) {
        return []
    }

    const searchResults = searchResponse.hits
        .map((hit) => {
            const { query } = searchResponse
            // @ts-expect-error
            const { type, slug, data } = hit._formatted

            const flattenedObjData = flattenObj(data)

            return getSearchResultItem(query, type, flattenedObjData, slug)
        })
        .filter(Boolean) as TSearchResultItem[]

    return searchResults
}
