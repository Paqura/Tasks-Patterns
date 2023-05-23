import cn from 'classnames'
import debounce from 'lodash/debounce'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { SliderButtons } from '@/components/ui/SliderButtons'

import styles from './index.module.scss'

type TProps = {
    className?: string
    scrollAreaClassName?: string
    controls?: React.ReactNode
    hideControls?: boolean
}

const scrollStepRatio = 0.4

export const CardsSlider: React.FC<React.PropsWithChildren<TProps>> = ({
    className,
    scrollAreaClassName,
    children,
    controls,
    hideControls,
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false)
    const [canScrollRight, setCanScrollRight] = useState<boolean>(true)
    const [showScrollControls, setShowScrollControls] = useState<boolean>(true)

    const calculateButtonsState = useCallback((scrollPosition: number) => {
        const el = containerRef.current
        if (el) {
            const fullWidth = el.scrollWidth
            const visibleWidth = el.clientWidth
            setShowScrollControls(fullWidth > visibleWidth)
            setCanScrollLeft(scrollPosition > 0)
            setCanScrollRight(scrollPosition < fullWidth - visibleWidth)
        }
    }, [])

    useEffect(() => {
        const handleResize = debounce(
            () => {
                const el = containerRef.current
                el && calculateButtonsState(el.scrollLeft)
            },
            500,
            {
                leading: false,
            }
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
        if (el) {
            const scrollListener = () => {
                calculateButtonsState(el.scrollLeft)
            }
            el.addEventListener('scrollend', scrollListener)
            el.addEventListener('touchend', scrollListener)
            return () => {
                el?.removeEventListener('scrollend', scrollListener)
                el?.removeEventListener('touchend', scrollListener)
            }
        }
    }, [calculateButtonsState])

    const handleClickLeft = () => {
        const el = containerRef.current
        if (el) {
            const currentScrollPos = el.scrollLeft
            const visibleWidth = containerRef.current?.clientWidth
            const newScrollPos = Math.max(
                Math.ceil(currentScrollPos - visibleWidth * scrollStepRatio),
                0
            )
            if (currentScrollPos !== newScrollPos) {
                el.scroll({
                    left: newScrollPos,
                    behavior: 'smooth',
                })
                calculateButtonsState(newScrollPos)
            }
        }
    }
    const handleClickRight = () => {
        const el = containerRef.current
        if (el) {
            const fullWidth = containerRef.current?.scrollWidth
            const visibleWidth = containerRef.current?.clientWidth
            const currentScrollPos = containerRef.current?.scrollLeft
            const maxScrollPosition = fullWidth - visibleWidth
            const newScrollPos = Math.min(
                Math.ceil(currentScrollPos + visibleWidth * scrollStepRatio),
                maxScrollPosition
            )

            if (currentScrollPos !== newScrollPos) {
                el.scroll({
                    left: newScrollPos,
                    behavior: 'smooth',
                })
                calculateButtonsState(newScrollPos)
            }
        }
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
