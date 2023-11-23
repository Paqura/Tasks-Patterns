import { CardsSlider } from '@/shared/ui/common/CardsSlider'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { PageSection } from '@/shared/ui/project/PageSection'

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

export const HistorySection = ({ data }: THistorySectionProps) => {
    const { isVisible, title, description, historyItems } = data

    if (!isVisible) {
        return null
    }

    return (
        <PageSection.Card mode={'light'}>
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
        </PageSection.Card>
    )
}
