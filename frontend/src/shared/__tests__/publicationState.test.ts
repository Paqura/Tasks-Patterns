import { describe, expect, test } from 'vitest'

import { TPublicationState, getPublicationStateFromQuery } from '../lib/publicationState'

describe('getPublicationStateFromQuery', () => {
    describe('with empty query', () => {
        test('return live mode', () => {
            const result = getPublicationStateFromQuery({})

            expect(result).toBe<TPublicationState>('live')
        })
    })

    describe('with invalid query', () => {
        test('return live mode', () => {
            const result = getPublicationStateFromQuery({
                publicationState: 'invalid',
            })

            expect(result).toBe<TPublicationState>('live')
        })
    })

    describe('with correct query', () => {
        test('return live mode if publicationState is live', () => {
            const result = getPublicationStateFromQuery({
                publicationState: 'live',
            })

            expect(result).toBe<TPublicationState>('live')
        })

        test('return preview mode if publicationState is preview', () => {
            const result = getPublicationStateFromQuery({
                publicationState: 'preview',
            })

            expect(result).toBe<TPublicationState>('preview')
        })
    })
})
