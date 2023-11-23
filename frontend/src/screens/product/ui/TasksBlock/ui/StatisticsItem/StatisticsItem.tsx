import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'

import styles from './index.module.scss'

type TStatisticsItemProps = {
    value: string
    label: string
}

export const StatisticsItem = ({ value, label }: TStatisticsItemProps) => {
    return (
        <div className={styles.item}>
            <div className={styles.textContent}>
                <Heading className={styles.value} level={2}>
                    {value}
                </Heading>

                <Text className={styles.description} type="pM">
                    {label}
                </Text>
            </div>
        </div>
    )
}
