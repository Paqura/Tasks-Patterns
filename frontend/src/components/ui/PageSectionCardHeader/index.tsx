import React from 'react'

import { Text } from '@/components/ui//typography/Text'
import { Heading } from '@/components/ui/typography/Heading'

import styles from './index.module.scss'

export const PageSectionCardHeader: React.FC<{ title: string; description: string }> = ({
    title,
    description,
}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.text}>
                <Heading level={1}>{title}</Heading>
                <Text className={styles.description} type="pL">
                    {description}
                </Text>
            </div>
        </div>
    )
}
