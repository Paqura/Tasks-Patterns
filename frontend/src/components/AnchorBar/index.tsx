import cn from 'classnames'
import { debounce } from 'lodash'
import NextLink from 'next/link'
import { MouseEvent, MutableRefObject, useEffect, useRef, useState } from 'react'

import { PageSection } from '@/components/ui/PageSection'
import { Text } from '@/components/ui/typography/Text'
import { isInViewPort } from '@/utils/helpers'

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

    const wrapperRef = useRef<HTMLDivElement | null>(null) as MutableRefObject<HTMLDivElement>
    const contentRef = useRef<HTMLDivElement | null>(null) as MutableRefObject<HTMLDivElement>

    useEffect(() => {
        const contentEl = contentRef.current
        const wrapperEl = wrapperRef.current

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

        const element = document.getElementById(anchor)

        if (element) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0
            const barHeight = wrapperRef?.current.offsetHeight || 0

            const elementOffsetTop = element.offsetTop - (headerHeight + barHeight)

            window.scrollTo({
                top: elementOffsetTop,
                behavior: 'smooth',
            })
        }
    }

    return (
        <PageSection className={cn({ [styles.bar_float]: isFloat })}>
            <div ref={wrapperRef} className={styles.wrapper}>
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
    )
}
