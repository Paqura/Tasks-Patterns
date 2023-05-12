import cn from 'classnames'
import NextLink from 'next/link'
import { MutableRefObject, useEffect, useRef, useState } from 'react'

import { PageSection } from '@/components/ui/PageSection'
import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

type TAnchorLink = {
    name: string
    link: string
}

interface IAnchorBar {
    anchors: TAnchorLink[]
}

export const AnchorBar = ({ anchors }: IAnchorBar) => {
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

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <PageSection>
            <div ref={wrapperRef} className={styles.wrapper}>
                <div
                    ref={contentRef}
                    className={styles.content}
                    style={{ gridTemplateColumns: `repeat(${anchors.length}, 1fr)` }}
                >
                    {anchors.map((anchor) => (
                        <NextLink
                            key={anchor.link}
                            href={anchor.link}
                            className={cn(styles.anchor, {
                                [styles.anchor_active]: activeTab === anchor.link,
                            })}
                            onClick={() => setActiveTab(anchor.link)}
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
