import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'

import styles from './index.module.scss'

type TStatisticValueCardProps = {
    value: string
    title: string
}

export const StatisticValueCard = ({ value, title }: TStatisticValueCardProps) => {
    return (
        <div className={styles.card}>
            <Heading className={styles.value} level={2}>
                {value}
            </Heading>
            <Text className={styles.title} type="pM">
                {title}
            </Text>
        </div>
    )
}
