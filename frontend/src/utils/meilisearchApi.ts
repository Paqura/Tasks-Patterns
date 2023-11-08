import { MeiliSearch } from 'meilisearch'

export const highlightPreTag = '<em>'
export const highlightPostTag = '</em>'

export const getSearchString = (query: string | string[] | undefined): string | undefined => {
    const value = Array.isArray(query) ? query[0] : query

    if (!value) {
        return undefined
    }
    const decodedValue = decodeURI(value)
    const trimmedValue = decodedValue.trim()

    return trimmedValue
}

export const getSearchResponse = async (searchString: string, locale?: string) => {
    try {
        const client = new MeiliSearch({
            host: process.env.MEILISEARCH_HOST || '',
            apiKey: process.env.MEILISEARCH_APP_KEY,
        })

        const index = client.index('searchable-items')

        const response = await index.search(searchString, {
            attributesToHighlight: ['data'],
            highlightPreTag,
            highlightPostTag,
            attributesToCrop: ['*'],
            cropLength: 50,
            filter: locale && `locale = ${locale}`,
        })

        return response
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        return null
    }
}
