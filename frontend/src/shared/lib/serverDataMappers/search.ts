import { SearchResponse } from 'meilisearch'

import { TSearchResultItem } from '@/screens/search/ui/SearchResultsList'
import { highlightPreTag } from '@/services/meilisearch'

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
    replacement: { from: string; to: string },
): string => {
    const { from, to } = replacement

    let maxCount = 0
    let resultKey = ''

    const entries = Object.entries(data)
    for (const [key, value] of entries) {
        if (typeof value === 'string') {
            const higlightsCount = value.match(new RegExp(highlightPreTag, 'g'))?.length || 0

            if (higlightsCount > maxCount) {
                maxCount = higlightsCount
                resultKey = key
            }
        }
    }

    if (resultKey === from) {
        return String(data[to] ?? '')
    }

    return String(data[resultKey] || entries[0]?.[1] || '')
}

const getSearchResultItem = (
    query: string,
    type: string,
    data: TObject,
    slug?: string,
    locale?: string,
): TSearchResultItem | undefined => {
    if (type === 'about-page') {
        return {
            title: String(data.title),
            description: getDescription(query, data, { from: 'title', to: 'description' }),
            href: '/about',
            locale: locale,
        }
    }

    if (type === 'analytic-article') {
        return {
            title: String(data.title),
            description: getDescription(query, data, { from: 'title', to: 'topic' }),
            href: `/analytics/${slug}`,
            locale: locale,
        }
    }

    if (type === 'news-item' || type === 'webinars-item') {
        const href = type === 'webinars-item' ? `/webinar/${slug}` : `/news/${slug}`

        return {
            title: String(data.title),
            description: getDescription(query, data, { from: 'title', to: 'topic' }),
            href: href,
            locale: locale,
        }
    }

    if (type === 'product') {
        return {
            title: String(data.title),
            description: getDescription(query, data, { from: 'title', to: 'subtitle' }),
            href: `/products/${slug}`,
            locale: locale,
        }
    }

    return undefined
}

export const mapSearchResponseServerData = (
    searchResponse?: SearchResponse | null,
): TSearchResultItem[] => {
    if (!searchResponse) {
        return []
    }

    const searchResults = searchResponse.hits
        .map((hit) => {
            const { query } = searchResponse
            // @ts-expect-error
            const { type, slug, locale, data } = hit._formatted

            const flattenedObjData = flattenObj(data)

            return getSearchResultItem(query, type, flattenedObjData, slug, locale)
        })
        .filter(Boolean) as TSearchResultItem[]

    return searchResults
}
