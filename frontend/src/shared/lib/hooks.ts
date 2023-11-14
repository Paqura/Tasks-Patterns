import { Dispatch, MutableRefObject, RefObject, SetStateAction, useEffect, useState } from 'react'

import { EScreenEdges } from '@/types'

export const useOutsideClick = (
    conditionFlag: boolean,
    ref: MutableRefObject<HTMLElement>,
    callback: () => void,
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback()
            }
        }

        if (!conditionFlag) return

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [conditionFlag, ref, callback])
}

export const useIsDesktopSmall = () => {
    const [isDesktopSmall, setIsDesktopSmall] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsDesktopSmall(window.innerWidth <= EScreenEdges.desktopSmall)
        }
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return isDesktopSmall
}

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= EScreenEdges.mobile)
        }
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return isMobile
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
