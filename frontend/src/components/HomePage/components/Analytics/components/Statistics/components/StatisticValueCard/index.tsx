import React from 'react'

import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

type TProps = {
    value: string
    title: string
}

export const StatisticValueCard: React.FC<TProps> = ({ value, title }) => {
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
