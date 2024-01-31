import debounce from 'lodash/debounce'
import { RefObject, useCallback, useEffect, useState } from 'react'

import type { TClickDirection } from '@/shared/ui/common/SliderButtons'

const SCROLL_STEP_RATIO = 0.4
const RESIZE_DELAY = 500

export const useCardsSlider = (containerRef: RefObject<HTMLDivElement>) => {
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const [showScrollControls, setShowScrollControls] = useState(true)

    const calculateButtonsState = useCallback(
        (scrollPosition: number) => {
            const el = containerRef.current

            if (!el) return

            const fullWidth = el.scrollWidth
            const visibleWidth = el.clientWidth

            setShowScrollControls(fullWidth > visibleWidth)
            setCanScrollLeft(scrollPosition > 0)
            setCanScrollRight(scrollPosition < fullWidth - visibleWidth)
        },
        [containerRef],
    )

    useEffect(() => {
        const handleResize = debounce(
            () => {
                const el = containerRef.current
                el && calculateButtonsState(el.scrollLeft)
            },
            RESIZE_DELAY,
            {
                leading: false,
            },
        )

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [calculateButtonsState, containerRef])

    useEffect(() => {
        calculateButtonsState(containerRef.current?.scrollLeft || 0)
    }, [calculateButtonsState, containerRef])

    useEffect(() => {
        const el = containerRef.current

        if (!el) return

        const scrollListener = () => {
            calculateButtonsState(el.scrollLeft)
        }

        el.addEventListener('scrollend', scrollListener)
        el.addEventListener('touchend', scrollListener)

        return () => {
            el?.removeEventListener('scrollend', scrollListener)
            el?.removeEventListener('touchend', scrollListener)
        }
    }, [calculateButtonsState, containerRef])

    const handleClickLeft = () => {
        const el = containerRef.current
        if (!el) return

        const currentScrollPos = el.scrollLeft
        const visibleWidth = containerRef.current?.clientWidth
        const newScrollPos = Math.max(
            Math.ceil(currentScrollPos - visibleWidth * SCROLL_STEP_RATIO),
            0,
        )

        if (currentScrollPos === newScrollPos) return

        el.scroll({
            left: newScrollPos,
            behavior: 'smooth',
        })

        calculateButtonsState(newScrollPos)
    }

    const handleClickRight = () => {
        const el = containerRef.current
        if (!el) return

        const fullWidth = containerRef.current?.scrollWidth
        const visibleWidth = containerRef.current?.clientWidth
        const currentScrollPos = containerRef.current?.scrollLeft
        const maxScrollPosition = fullWidth - visibleWidth
        const newScrollPos = Math.min(
            Math.ceil(currentScrollPos + visibleWidth * SCROLL_STEP_RATIO),
            maxScrollPosition,
        )

        if (currentScrollPos === newScrollPos) return

        el.scroll({
            left: newScrollPos,
            behavior: 'smooth',
        })

        calculateButtonsState(newScrollPos)
    }

    const handleButtonClick = (dir: TClickDirection) => {
        const actionsMap: Record<TClickDirection, VoidFunction> = {
            next: handleClickRight,
            prev: handleClickLeft,
        }

        actionsMap[dir]()
    }

    return { showScrollControls, canScrollLeft, canScrollRight, handleButtonClick }
}
