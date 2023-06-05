import { SearchResponse } from 'meilisearch'

import { TSearchResultItem } from '@/components/SearchPage/components/SearchResultsList'
import { highlightPreTag } from '@/utils/meilisearchApi'

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

const getDescription = (data: TObject, replacement: { from: string; to: string }) => {
    const { from, to } = replacement

    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
            if (value.includes(highlightPreTag)) {
                if (key === from) {
                    return String(data[to])
                }

                return value
            }
        }
    }

    return ''
}

const getSearchResultItem = (
    type: string,
    data: TObject,
    slug?: string
): TSearchResultItem | undefined => {
    if (type === 'about-page') {
        return {
            title: String(data.title),
            description: getDescription(data, { from: 'title', to: 'description' }),
            href: '/about',
        }
    }

    if (type === 'analytic-article') {
        return {
            title: String(data.title),
            description: getDescription(data, { from: 'title', to: 'topic' }),
            href: `/analytics/${slug}`,
        }
    }

    if (type === 'news-item' || type === 'webinars-item') {
        const href = type === 'webinars-item' ? `/webinar/${slug}` : `/news/${slug}`

        return {
            title: String(data.title),
            description: getDescription(data, { from: 'title', to: 'topic' }),
            href,
        }
    }

    if (type === 'product') {
        return {
            title: String(data.title),
            description: getDescription(data, { from: 'title', to: 'subtitle' }),
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
            // @ts-expect-error
            const { type, slug, data } = hit._formatted

            const flattenedObjData = flattenObj(data)

            return getSearchResultItem(type, flattenedObjData, slug)
        })
        .filter(Boolean) as TSearchResultItem[]

    return searchResults
}
