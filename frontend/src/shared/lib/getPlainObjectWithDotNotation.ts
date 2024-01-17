type TObject = Record<string, unknown>

const isObject = (value: unknown): value is TObject =>
    typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * @description Returns plain object with dot notation
 * @example
 *  Input {
 *   a: {
 *    b: {
 *      c: 2
 *    },
 *    d: [ { f: { j: 5 } } ]
 *   }
 *  }
 *  Output {
 *    'a.b.c': 2,
 *    'a.d[0].f.j': 5
 *  }
 */
export const getPlainObjectWithDotNotation = (obj: TObject): TObject => {
    const result: TObject = {}

    for (const [key, value] of Object.entries(obj)) {
        if (isObject(value)) {
            const flattenedObj = getPlainObjectWithDotNotation(value)

            for (const [innerKey, innerValue] of Object.entries(flattenedObj)) {
                const preparedKey = [key, innerKey].join('.')

                result[preparedKey] = innerValue
            }

            continue
        }

        if (Array.isArray(value)) {
            for (let idx = 0; idx < value.length; idx++) {
                const currentValue = value[idx]

                const isPrimitiveValue = !isObject(currentValue) && !Array.isArray(currentValue)

                if (isPrimitiveValue) {
                    const preparedKey = `${key}[${idx}]`

                    result[preparedKey] = currentValue

                    continue
                }

                const isArray = Array.isArray(currentValue)
                const flattenedObj = getPlainObjectWithDotNotation(value[idx])

                for (const [innerKey, innerValue] of Object.entries(flattenedObj)) {
                    if (isArray) {
                        result[`${key}[${idx}][${innerKey}]`] = innerValue
                    } else {
                        result[`${key}[${idx}].${innerKey}`] = innerValue
                    }
                }
            }

            continue
        }

        result[key] = value
    }

    return result
}
