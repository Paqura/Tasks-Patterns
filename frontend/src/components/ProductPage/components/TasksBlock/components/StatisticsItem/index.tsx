import React from 'react'

import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

type TProps = {
    value: string
    label: string
}

export const StatisticsItem: React.FC<TProps> = ({ value, label }) => {
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
