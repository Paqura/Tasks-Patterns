import { Dispatch, RefObject, SetStateAction, useEffect } from 'react'

export const isInViewPort = (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect()
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight
    return (
        (rect.top > 0 && rect.top < viewPortHeight) ||
        (rect.bottom > 0 && rect.bottom < viewPortHeight)
    )
}

export const useObserver = (
    ref: RefObject<HTMLDivElement>,
    callback: Dispatch<SetStateAction<boolean>>,
    isFloat = true,
) => {
    useEffect(() => {
        if (!isFloat || !ref.current) {
            return
        }
        let observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0]) {
                    return
                }
                if (entries[0].intersectionRatio > 0) {
                    callback(false)
                } else {
                    callback(true)
                }
            },
            {
                threshold: 0.3,
                root: window.document,
            },
        )
        observer.observe(ref.current)

        return () => {
            observer.disconnect()
        }
    }, [ref, callback, isFloat])
}
