import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'

import { Icon } from './Icon'
import styles from './index.module.scss'

export type THistoryItemData = {
    date: string
    number: string
    numberDescription: string
    achievements: string[]
}

type THistoryItemProps = {
    data: THistoryItemData
}

export const HistoryItem = ({ data }: THistoryItemProps) => {
    const { date, number, numberDescription, achievements } = data

    return (
        <div className={styles.historyItem}>
            <Icon className={styles.icon} />

            <Heading level={3} className={styles.date}>
                {date}
            </Heading>

            <Heading level={2} className={styles.number}>
                {number}
            </Heading>

            <Text type="pL" className={styles.numberDescription}>
                {numberDescription}
            </Text>

            <ul>
                {achievements.map((achievement, index) => (
                    <li key={index} className={styles.listItem}>
                        <Text type="pM" className={styles.listItemText}>
                            {achievement}
                        </Text>
                    </li>
                ))}
            </ul>
        </div>
    )
}
