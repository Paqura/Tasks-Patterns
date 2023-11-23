import cn from 'classnames'
import debounce from 'lodash/debounce'
import {
    PropsWithChildren,
    ReactNode,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'

import { SliderButtons } from '@/shared/ui/common/SliderButtons'

import styles from './index.module.scss'

const SCROLL_STEP_RATIO = 0.4
const RESIZE_DELAY = 500

type TCardsSliderProps = {
    className?: string
    scrollAreaClassName?: string
    controls?: ReactNode
    hideControls?: boolean
}

export const CardsSlider = ({
    className,
    scrollAreaClassName,
    children,
    controls,
    hideControls,
}: PropsWithChildren<TCardsSliderProps>) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const [showScrollControls, setShowScrollControls] = useState(true)

    const calculateButtonsState = useCallback((scrollPosition: number) => {
        const el = containerRef.current

        if (!el) return

        const fullWidth = el.scrollWidth
        const visibleWidth = el.clientWidth

        setShowScrollControls(fullWidth > visibleWidth)
        setCanScrollLeft(scrollPosition > 0)
        setCanScrollRight(scrollPosition < fullWidth - visibleWidth)
    }, [])

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
    }, [calculateButtonsState])

    useLayoutEffect(() => {
        calculateButtonsState(containerRef.current?.scrollLeft || 0)
    }, [calculateButtonsState])

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
    }, [calculateButtonsState])

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

    return (
        <div className={cn(styles.wrapper, className)}>
            {!hideControls && (
                <div className={styles.controlsBlock}>
                    {controls && <div className={styles.extraControls}>{controls}</div>}
                    {showScrollControls && (
                        <SliderButtons
                            className={styles.moveButtons}
                            disableLeft={!canScrollLeft}
                            disableRight={!canScrollRight}
                            onLeftClick={handleClickLeft}
                            onRightClick={handleClickRight}
                        />
                    )}
                </div>
            )}

            <div className={cn(styles.scrollArea, scrollAreaClassName)} ref={containerRef}>
                {children}
            </div>
        </div>
    )
}
