import React from 'react'

import { getNode } from '@/utils/getNode'

export type TDirections =
    | 'top-center'
    | 'top-left'
    | 'top-right'
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'left-center'
    | 'right-center'

type TViewportDimensions = {
    top: number
    left: number
    bottom: number
    right: number
}

type TPopupPosition = {
    top: number
    left: number
}

type TPopupSize = {
    area: number
    width: number
    height: number
}

type TAnchorDimensions = {
    top: number
    left: number
    width: number
    height: number
}

const getViewportDimensions = () => {
    const top = window.pageYOffset
    const left = window.pageXOffset
    const height = window.innerHeight
    const width = window.innerWidth

    return {
        top,
        left,
        bottom: top + height,
        right: left + width,
    }
}

const getPopupDimensions = (popup: HTMLElement | null) => {
    const dimensions = {
        width: popup ? popup.offsetWidth : 0,
        height: popup ? popup.offsetHeight : 0,
    }

    return {
        ...dimensions,
        area: dimensions.width * dimensions.height,
    }
}

const getAnchorDimensions = (anchor: HTMLElement | React.Component | null, isPortal: boolean) => {
    const anchorObject = getNode(anchor)

    if (anchorObject && anchorObject instanceof Element) {
        const anchorRect = anchorObject.getBoundingClientRect()
        const viewportRect = document.documentElement.getBoundingClientRect()

        return {
            left: isPortal ? anchorRect.left - viewportRect.left : 0,
            top: isPortal ? anchorRect.top - viewportRect.top : 0,
            width: isPortal ? anchorRect.width : anchorObject.clientWidth,
            height: isPortal ? anchorRect.height : anchorObject.clientHeight,
        }
    }

    return {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    }
}

const getPopupPosition = ({
    direction,
    anchorDimensions,
    popupSize,
    offset = 5,
}: {
    direction: string[]
    anchorDimensions: TAnchorDimensions
    popupSize: TPopupSize
    offset?: number
}) => {
    let top = 0
    let left = 0

    // Базовая направляющая
    if (direction[0] === 'bottom') {
        top = anchorDimensions.top + anchorDimensions.height + offset
    } else if (direction[0] === 'top') {
        top = anchorDimensions.top - popupSize.height - offset
    } else if (direction[0] === 'left') {
        left = anchorDimensions.left - popupSize.width - offset
    } else if (direction[0] === 'right') {
        left = anchorDimensions.left + anchorDimensions.width + offset
    }

    // Дополнительная направляющая
    if (direction[1] === 'right') {
        left = anchorDimensions.left + anchorDimensions.width - popupSize.width
    } else if (direction[1] === 'left') {
        left = anchorDimensions.left
    } else if (direction[1] === 'bottom') {
        top = anchorDimensions.top + anchorDimensions.height - popupSize.height
    } else if (direction[1] === 'top') {
        top = anchorDimensions.top
    } else if (direction[1] === 'center') {
        if (direction[0] === 'bottom' || direction[0] === 'top') {
            left = anchorDimensions.left + anchorDimensions.width / 2 - popupSize.width / 2
        } else if (direction[0] === 'left' || direction[0] === 'right') {
            top = anchorDimensions.top + anchorDimensions.height / 2 - popupSize.height / 2
        }
    }

    return { top: Math.floor(top), left: Math.floor(left) }
}

const getViewportFactor = (
    popupPosition: TPopupPosition,
    viewportDimensions: TViewportDimensions,
    popupSize: TPopupSize
) => {
    const viewportOffset = 10
    const intersectionLeft = Math.max(popupPosition.left, viewportDimensions.left + viewportOffset)
    const intersectionRight = Math.min(
        popupPosition.left + popupSize.width,
        viewportDimensions.right - viewportOffset
    )
    const intersectionTop = Math.max(popupPosition.top, viewportDimensions.top + viewportOffset)
    const intersectionBottom = Math.min(
        popupPosition.top + popupSize.height,
        viewportDimensions.bottom - viewportOffset
    )

    if (intersectionLeft < intersectionRight && intersectionTop < intersectionBottom) {
        return (
            ((intersectionRight - intersectionLeft) * (intersectionBottom - intersectionTop)) /
            popupSize.area
        )
    }

    return 0
}

export const getScrollableParentNodes = (element: Element | Text | null) => {
    if (!(element instanceof Element)) {
        return [window]
    }

    const { position } = window.getComputedStyle(element)
    const scrollableParents = []

    if (position === 'fixed') {
        return [element]
    }

    let parent = element

    while ((parent = parent.parentNode as Element) && parent.nodeType === 1) {
        const style = window.getComputedStyle(parent)

        if (!style) {
            scrollableParents.push(parent)
            return scrollableParents
        }

        const overflow = (style.overflow || '') + (style.overflowY || '') + (style.overflowX || '')
        if (/(auto|scroll)/.test(overflow)) {
            if (
                position !== 'absolute' ||
                ['relative', 'absolute', 'fixed'].indexOf(style.position || '') >= 0
            ) {
                scrollableParents.push(parent)
            }
        }
    }

    scrollableParents.push(window)

    return scrollableParents
}

const CALENDAR_RIGHT_OFFSET = 25

export const getPositionInLayout = ({
    directions,
    direction,
    popup,
    anchor,
    offset,
    isPortal,
}: {
    directions: TDirections[]
    direction: TDirections
    popup: HTMLElement | null
    anchor: HTMLElement | React.Component | null
    offset: number
    isPortal: boolean
}) => {
    const viewportDimensions = getViewportDimensions()
    const popupSize = getPopupDimensions(popup)
    const anchorDimensions = isPortal ? null : getAnchorDimensions(anchor, isPortal)
    const absoluteAnchorDimensions = getAnchorDimensions(anchor, true)
    const directionChunks = directions.map((direction) => direction.split('-'))

    let bestViewportFactor = 0
    let bestDirection = directions[0]
    let bestPosition = {
        left: 0,
        top: 0,
    }

    for (let i = 0; i < directionChunks.length; i++) {
        const currentDirection = directionChunks[i]
        const position = getPopupPosition({
            direction: currentDirection,
            anchorDimensions: anchorDimensions || absoluteAnchorDimensions,
            popupSize,
            offset,
        })
        const absolutePosition = isPortal
            ? null
            : getPopupPosition({
                  direction: currentDirection,
                  anchorDimensions: absoluteAnchorDimensions,
                  popupSize,
                  offset,
              })
        const viewportFactor = getViewportFactor(
            absolutePosition || position,
            viewportDimensions,
            popupSize
        )

        if (
            viewportFactor > bestViewportFactor ||
            (!bestViewportFactor && direction === currentDirection.join('-'))
        ) {
            bestDirection = currentDirection.join('-') as TDirections
            bestViewportFactor = viewportFactor
            if (
                position.left + popupSize.width >
                viewportDimensions.right - CALENDAR_RIGHT_OFFSET
            ) {
                bestPosition = {
                    ...position,
                    left: viewportDimensions.right - popupSize.width - CALENDAR_RIGHT_OFFSET,
                }
            } else {
                bestPosition = position
            }
        }

        if (bestViewportFactor > 0.99) {
            break
        }
    }
    return {
        direction: bestDirection,
        anchorLeft: absoluteAnchorDimensions.left,
        anchorWidth: absoluteAnchorDimensions.width,
        popupSize: popupSize,
        ...bestPosition,
    }
}
