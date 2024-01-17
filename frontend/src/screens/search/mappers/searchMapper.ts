import { SearchResponse } from 'meilisearch'
import { P, match } from 'ts-pattern'

import { TSearchResultItem } from '@/screens/search/ui/SearchResultsList'
import { highlightPreTag } from '@/services/meilisearch'
import { getPlainObjectWithDotNotation } from '@/shared/lib/getPlainObjectWithDotNotation'

type TObject = Record<string, unknown>

const regex = new RegExp(highlightPreTag, 'g')

export const getDescription = (
    data: TObject,
    replacement: { from: string; to: string },
): string => {
    const { from, to } = replacement

    let maxCount = 0
    let resultKey = ''

    const entries = Object.entries(data)

    for (const [key, value] of entries) {
        if (typeof value !== 'string') {
            continue
        }

        const highlightsCount = value.match(regex)?.length || 0

        if (highlightsCount > maxCount) {
            maxCount = highlightsCount
            resultKey = key
        }
    }

    if (resultKey === from) {
        return String(data[to] ?? '')
    }

    return String(data[resultKey] || entries[0]?.[1] || '')
}

type TSearchResultType =
    | 'about-page'
    | 'analytic-article'
    | 'news-item'
    | 'webinars-item'
    | 'product'

type TGetSearchResultItem = {
    type: TSearchResultType
    data: TObject
    slug?: string
    locale?: string
}

const getSearchResultItem = ({
    data,
    type,
    locale,
    slug,
}: TGetSearchResultItem): TSearchResultItem | null =>
    match(type)
        .with('about-page', () => ({
            title: String(data.title),
            description: getDescription(data, { from: 'title', to: 'description' }),
            href: '/about',
            locale: locale,
        }))
        .with('analytic-article', () => ({
            title: String(data.title),
            description: getDescription(data, { from: 'title', to: 'topic' }),
            href: `/analytics/${slug}`,
            locale: locale,
        }))
        .with(P.union('news-item', 'webinars-item'), (currentType) => ({
            title: String(data.title),
            description: getDescription(data, { from: 'title', to: 'topic' }),
            href: currentType === 'webinars-item' ? `/webinar/${slug}` : `/news/${slug}`,
            locale: locale,
        }))
        .with('product', () => ({
            title: String(data.title),
            description: getDescription(data, { from: 'title', to: 'subtitle' }),
            href: `/products/${slug}`,
            locale: locale,
        }))
        .otherwise(() => null)

export const toDomain = (searchResponse?: SearchResponse | null): TSearchResultItem[] => {
    if (!searchResponse) {
        return []
    }

    return searchResponse.hits.reduce<TSearchResultItem[]>((acc, hit) => {
        // @ts-expect-error
        const { type, slug, locale, data } = hit._formatted

        const flattenedObjData = getPlainObjectWithDotNotation(data)

        const searchResult = getSearchResultItem({
            type,
            data: flattenedObjData,
            slug,
            locale,
        })

        if (searchResult) {
            acc.push(searchResult)
        }

        return acc
    }, [])
}
