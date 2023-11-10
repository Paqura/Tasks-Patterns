import { MutableRefObject, useEffect, useState } from 'react'

import { EScreenEdges } from '@/types'

export const useOutsideClick = (
    conditionFlag: boolean,
    ref: MutableRefObject<HTMLElement>,
    callback: () => void,
) => {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback()
            }
        }

        if (conditionFlag) {
            document.addEventListener('mousedown', handleClickOutside)
        }
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
