import throttle from 'lodash/throttle'
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

export const useMedia = () => {
    const [media, setMedia] = useState({
        isMobile: false,
        isDesktopSmall: false,
        isDesktopWide: false,
    })

    useEffect(() => {
        const THROTTLE_TIME = 300

        const handleResize = throttle(() => {
            setMedia({
                isMobile: window.innerWidth <= EScreenEdges.mobile,
                isDesktopSmall: window.innerWidth <= EScreenEdges.desktopSmall,
                isDesktopWide: window.innerWidth > EScreenEdges.desktopSmall,
            })
        }, THROTTLE_TIME)

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return media
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
