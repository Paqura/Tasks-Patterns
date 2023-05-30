import { useEffect, useRef, useState } from 'react'

import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import { HistoryItem, THistoryItemData } from './components/HistoryItem'
import styles from './index.module.scss'

export type THistorySectionData = {
    title: string
    description: string
    historyItems: THistoryItemData[]
}

type THistorySectionProps = {
    data: THistorySectionData
}

export const HistorySection: React.FC<THistorySectionProps> = ({ data }) => {
    const { title, description, historyItems } = data

    const [isShadowVisible, setIsShadowVisible] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const contentEl = contentRef.current

        if (!contentEl) {
            return
        }
        const handleResize = () => {
            setIsShadowVisible(contentEl.scrollWidth > contentEl.clientWidth)
        }

        const handleScroll = () => {
            const isScrolledTillEnd =
                contentEl.scrollWidth - contentEl.offsetWidth - contentEl.scrollLeft < 40

            setIsShadowVisible(!isScrolledTillEnd)
        }

        window.addEventListener('resize', handleResize)
        contentEl.addEventListener('scroll', handleScroll)

        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
            contentEl.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <PageSectionCard mode={'light'}>
            <div className={styles.sectionHeading}>
                <Heading level={1} className={styles.sectionTitle}>
                    {title}
                </Heading>

                <Text type="pL" className={styles.sectionDescription}>
                    {description}
                </Text>
            </div>

            <div className={styles.historyBlock}>
                <div ref={contentRef} className={styles.historyBlockScrollArea}>
                    {historyItems.map((historyItem, index) => (
                        <HistoryItem key={index} data={historyItem} />
                    ))}

                    {isShadowVisible && <div className={styles.historyBlockShadow} />}
                </div>
            </div>
        </PageSectionCard>
    )
}
