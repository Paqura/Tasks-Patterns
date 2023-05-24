import cn from 'classnames'
import debounce from 'lodash/debounce'
import NextLink from 'next/link'
import { MouseEvent, useEffect, useRef, useState } from 'react'

import { PageSection } from '@/components/ui/PageSection'
import { Text } from '@/components/ui/typography/Text'
import { PAGE_SECTIONS_ANCHORS_ELEMENT_ID } from '@/utils/constants'
import { isInViewPort } from '@/utils/helpers'
import { scrollToSection } from '@/utils/scrollToSection'

import styles from './index.module.scss'

type TAnchorLink = {
    name: string
    link: string
}

interface IAnchorBar {
    anchors: TAnchorLink[]
    isFloat?: boolean
}

export const AnchorBar = ({ anchors, isFloat = true }: IAnchorBar) => {
    const [activeTab, setActiveTab] = useState<string>(anchors[0].link)
    const [isShadowvisible, setIsShadowvisible] = useState(false)
    const [isSticky, setIsSticky] = useState(false)

    const wrapperRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const intersectionSensorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isFloat || !intersectionSensorRef.current) {
            return
        }
        let observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0]) {
                    return
                }
                if (entries[0].intersectionRatio > 0) {
                    setIsSticky(false)
                } else {
                    setIsSticky(true)
                }
            },
            {
                threshold: 0.3,
                root: document.querySelector('main'),
                rootMargin: '-1px',
            }
        )
        observer.observe(intersectionSensorRef.current)

        return () => {
            observer.disconnect()
        }
    }, [isFloat])

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

    useEffect(() => {
        const handleScroll = debounce(() => {
            anchors.map((anchor) => {
                const element = document.getElementById(anchor.link)
                element && isInViewPort(element) && setActiveTab(anchor.link)
            })
        }, 500)
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [anchors])

    const handleClick = (e: MouseEvent<HTMLAnchorElement>, anchor: string) => {
        e.preventDefault()
        setActiveTab(anchor)
        scrollToSection(anchor)
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
                                    [styles.anchor_active]: activeTab === anchor.link,
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
