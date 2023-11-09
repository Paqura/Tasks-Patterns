import { ParsedUrlQuery } from 'querystring'

const publicationStates = ['live', 'preview'] as const

export type TPublicationState = (typeof publicationStates)[number]

export const getUrlWithPublicationState = (url: string, publicationState: TPublicationState) => {
    return [url, `publicationState=${publicationState}`].join('?')
}

export const getPublicationStateFromQuery = (query: ParsedUrlQuery): TPublicationState => {
    const publicationState = query.publicationState

    if (typeof query.publicationState !== 'string') return 'live'

    if (!publicationStates.includes(publicationState as TPublicationState)) return 'live'

    return query.publicationState as TPublicationState
}
