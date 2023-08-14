import cn from 'classnames'
import throttle from 'lodash/throttle'
import React, { useState, useEffect, useRef, Fragment } from 'react'

import { Portal } from '@/components/ui/Portal/Portal'
import { getNode } from '@/utils/getNode'

import styles from './index.module.scss'
import { getPositionInLayout, getScrollableParentNodes, TDirections } from './utils'

type TPopoverRenderChildren = (params: {
    direction: TDirections
    position: { left: number; top: number }
}) => React.ReactNode

export type TPopoverProps = {
    anchor: React.RefObject<HTMLElement | React.Component | null>
    childContent: React.RefObject<HTMLElement | null>
    directions: TDirections[]
    visible: boolean
    isPortal?: boolean
    withAnimation?: boolean
    propagateClick?: boolean
    offset?: number
    hasArrow?: boolean
    className?: string
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    children: TPopoverRenderChildren | React.ReactNode
    popoverWidth?: number
}

export const DEFAULT_OFFSET = 10

export const Popover = ({
    anchor,
    childContent,
    visible,
    directions,
    children,
    onMouseEnter,
    onMouseLeave,
    isPortal = true,
    withAnimation,
    propagateClick,
    className = '',
    offset = DEFAULT_OFFSET,
    popoverWidth,
}: TPopoverProps) => {
    const [position, setPosition] = useState({ left: -99999, top: -99999, anchorLeft: 0 })
    const [show, setShow] = useState(false)
    const [direction, setDirection] = useState(directions[0])
    const scrollableParentNodes = useRef<(Element | Window)[]>()

    const doReposition = (directions: TDirections[]) => {
        const {
            direction: calculatedDirection,
            left,
            top,
            anchorLeft,
            anchorWidth,
        } = getPositionInLayout({
            popup: childContent.current,
            directions,
            direction,
            anchor: anchor.current,
            offset,
            isPortal,
        })

        if (
            childContent.current &&
            (direction !== calculatedDirection || position.left !== left || position.top !== top)
        ) {
            setDirection(calculatedDirection)
            //Math.abs(position.left - left) > 1  это хак, связанный с тем, что в виндовом хроме смещение элемента на 1px
            //может привести к изменению его ширины на 1px, что приведет в вычислению нового положения,
            //а оно снова изменится на 1px. цикл замкнулся.
            setPosition({
                left: Math.abs(position.left - left) > 1 ? left : position.left,
                top: top,
                anchorLeft: anchorLeft + anchorWidth / 2,
            })
        }
    }

    const throttleReposition = throttle(doReposition, 100)
    const viewportResizeChangeHandler = () => {
        throttleReposition(directions)
    }
    const scrollChangeHandler = () => {
        if (visible) {
            doReposition(directions)
        }
    }

    useEffect(() => {
        if (visible) {
            if (!show) {
                doReposition(directions)
                setShow(true)
            }
        } else {
            if (show) {
                setShow(false)
            }
        }
    }, [visible, show])

    useEffect(() => {
        if (show) {
            scrollableParentNodes.current = getScrollableParentNodes(getNode(anchor.current))
            if (scrollableParentNodes.current) {
                scrollableParentNodes.current.forEach((parent) => {
                    parent.addEventListener('scroll', scrollChangeHandler, { passive: true })
                })
            }
            window.addEventListener('resize', viewportResizeChangeHandler, { passive: true })
        }

        return () => {
            if (scrollableParentNodes.current) {
                scrollableParentNodes.current.forEach((parent) => {
                    parent.removeEventListener('scroll', scrollChangeHandler)
                })
            }
            window.removeEventListener('resize', viewportResizeChangeHandler)
        }
    }, [anchor, show])

    if (!anchor || !anchor.current) {
        return null
    }

    const preventRootClickPropagation = (e: React.SyntheticEvent) => {
        e.stopPropagation()
    }
    const style = {
        left: position.left,
        top: position.top,
        width: popoverWidth,
    }
    const content =
        typeof children === 'function'
            ? children({
                  direction,
                  position,
              })
            : children
    const Overlay = isPortal ? Portal : Fragment

    return (
        <Overlay>
            <div
                className={cn(
                    styles.popover,
                    {
                        [styles.animation]: withAnimation,
                        [styles.visible]: visible,
                    },
                    styles[`direction_${direction}`],
                    className
                )}
                style={style}
                onClick={propagateClick ? undefined : preventRootClickPropagation}
            >
                <div
                    className={styles.children}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {content}
                </div>
            </div>
        </Overlay>
    )
}
