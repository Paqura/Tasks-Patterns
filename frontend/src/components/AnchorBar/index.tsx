import cn from 'classnames'
import NextLink from 'next/link'
import { MouseEvent, useEffect, useRef, useState } from 'react'

import { PageSection } from '@/components/ui/PageSection'
import { Text } from '@/components/ui/typography/Text'
import { useAnchors } from '@/utils/anchors'
import { PAGE_SECTIONS_ANCHORS_ELEMENT_ID } from '@/utils/constants'
import { useObserver } from '@/utils/helpers'

import styles from './index.module.scss'

export type TAnchorLink = {
    name: string
    link: string
}

type TAnchorBar = {
    anchors: TAnchorLink[]
    isFloat?: boolean
}

export const AnchorBar = ({ anchors, isFloat = true }: TAnchorBar) => {
    const { activeLink, api } = useAnchors()

    const [isShadowvisible, setIsShadowvisible] = useState(false)
    const [isSticky, setIsSticky] = useState(false)

    const wrapperRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const intersectionSensorRef = useRef<HTMLDivElement>(null)

    useObserver(intersectionSensorRef, setIsSticky, isFloat)

    useEffect(() => {
        const contentEl = contentRef.current
        const wrapperEl = wrapperRef.current

        if (!contentEl || !wrapperEl) {
            return
        }
        const handleResize = () => {
            setIsShadowvisible(wrapperEl.offsetWidth < contentEl.scrollWidth)
        }
        const handleScroll = () => {
            const isScrolledTillEnd =
                contentEl.scrollLeft === contentEl.scrollWidth - contentEl.offsetWidth
            setIsShadowvisible(!isScrolledTillEnd)
        }

        window.addEventListener('resize', handleResize)
        contentEl.addEventListener('scroll', handleScroll)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
            contentEl.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleClick = (e: MouseEvent<HTMLAnchorElement>, anchor: string) => {
        api.setActive(anchor)
    }

    return (
        <>
            <div className={styles.intersectionSensor} ref={intersectionSensorRef} />
            <PageSection
                className={cn({ [styles.bar_float]: isFloat, [styles.bar_aligned]: isSticky })}
            >
                <div
                    ref={wrapperRef}
                    className={styles.wrapper}
                    id={PAGE_SECTIONS_ANCHORS_ELEMENT_ID}
                >
                    <div
                        ref={contentRef}
                        className={styles.content}
                        style={{ gridTemplateColumns: `repeat(${anchors.length}, 1fr)` }}
                    >
                        {anchors.map((anchor) => (
                            <NextLink
                                key={anchor.link}
                                href={`#${anchor.link}`}
                                className={cn(styles.anchor, {
                                    [styles.anchor_active]: activeLink === anchor.link,
                                })}
                                onClick={(e) => handleClick(e, anchor.link)}
                            >
                                <Text type="pM" className={styles.text}>
                                    {anchor.name}
                                </Text>
                            </NextLink>
                        ))}
                        {isShadowvisible && <div className={styles.shadow} />}
                    </div>
                </div>
            </PageSection>
        </>
    )
}
