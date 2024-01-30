export const getRectMap = (dataSelector: string) => {
    if (typeof document === 'undefined') return {}

    const elements = document.querySelectorAll(`[${dataSelector}]`)

    const rectMap = Array.from(elements).reduce<Record<string, DOMRect>>((acc, curr) => {
        const key = (curr.getAttribute('href') ?? '').slice(1)

        acc[key] = curr.getBoundingClientRect()

        return acc
    }, {})

    return rectMap
}
