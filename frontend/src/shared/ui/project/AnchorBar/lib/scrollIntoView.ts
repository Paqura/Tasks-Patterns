import { RefObject, useCallback, useEffect, useRef } from 'react'
import { SwiperClass } from 'swiper/react'

import { useMedia } from '@/shared/lib/hooks'

import { useAnchors } from './api'
import { getRectMap } from './rectMap'

type TAnchorMapKey = string

const TRANSLATION_SPEED = 200

const BAR_OFFSET_MAP = {
    mobile: 20,
    otherwise: 40,
}

type TAnchorStructure = {
    map: Record<TAnchorMapKey, DOMRect> | null
    keys: TAnchorMapKey[]
}

export const useScrollIntoView = (swiperRef: RefObject<SwiperClass | undefined>) => {
    const { isMobile } = useMedia()
    const anchors = useAnchors()

    const BAR_OFFSET = isMobile ? BAR_OFFSET_MAP.mobile : BAR_OFFSET_MAP.otherwise

    const defaultRectMap = useRef<TAnchorStructure>({
        map: null,
        keys: [],
    })

    useEffect(() => {
        const rectMap = defaultRectMap.current?.map ?? getRectMap('data-anchor-element')

        const rectKeys = Object.keys(rectMap)

        const hasRectMap = rectKeys.length !== 0

        if (!hasRectMap) return

        if (!defaultRectMap.current.map) {
            defaultRectMap.current.map = rectMap
            defaultRectMap.current.keys = rectKeys
        }

        const getSwiperApi = () => swiperRef.current

        const handleScrollIntoView = () => {
            const swiperApi = getSwiperApi()

            if (!anchors.activeLink || !swiperApi) return

            const isExpectedLink = defaultRectMap.current.keys.includes(anchors.activeLink)

            if (!isExpectedLink) return

            const nextPosition = -Math.abs(rectMap[anchors.activeLink].x - BAR_OFFSET)

            swiperApi.translateTo(nextPosition, TRANSLATION_SPEED)
            swiperApi.update()
        }

        window.addEventListener('scrollend', handleScrollIntoView)

        return () => {
            window.removeEventListener('scrollend', handleScrollIntoView)
        }
    }, [BAR_OFFSET, anchors.activeLink, swiperRef])

    const handleAnchorClick = useCallback(
        (anchor: string) => {
            anchors.api.setActive(anchor)
        },
        [anchors.api],
    )

    return {
        activeLink: anchors.activeLink,
        handleAnchorClick,
    }
}
