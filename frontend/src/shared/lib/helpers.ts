export const isInViewPort = (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect()
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight
    return (
        (rect.top > 0 && rect.top < viewPortHeight) ||
        (rect.bottom > 0 && rect.bottom < viewPortHeight)
    )
}
