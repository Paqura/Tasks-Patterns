import { getPlainObjectWithDotNotation } from '../lib/getPlainObjectWithDotNotation'

describe('getPlainObjectWithDotNotation()', () => {
    it('returns expected object structure', () => {
        const result = getPlainObjectWithDotNotation({
            a: {
                b: {
                    c: '1',
                },
                d: [
                    {
                        f: {
                            j: '12',
                        },
                    },
                ],
            },
        })

        expect(result).toStrictEqual({
            'a.b.c': '1',
            'a.d[0].f.j': '12',
        })
    })
})
