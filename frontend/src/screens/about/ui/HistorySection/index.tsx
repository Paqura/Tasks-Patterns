import { CardsSlider } from '@/components/ui/CardsSlider'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'
import { HistoryItem, THistoryItemData } from './ui/HistoryItem'

export type THistorySectionData = {
    isVisible: boolean
    title: string
    description: string
    historyItems: THistoryItemData[]
}

type THistorySectionProps = {
    data: THistorySectionData
}

export const HistorySection: React.FC<THistorySectionProps> = ({ data }) => {
    const { isVisible, title, description, historyItems } = data

    if (!isVisible) {
        return null
    }

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

            <CardsSlider scrollAreaClassName={styles.historyBlockScrollArea}>
                {historyItems.map((historyItem, index) => (
                    <HistoryItem key={index} data={historyItem} />
                ))}
            </CardsSlider>
        </PageSectionCard>
    )
}
