import React from 'react'

import { Text } from '@/components/ui//typography/Text'
import {
    PageSectionCardGrid,
    PageSectionCardGridLeftColumn,
    PageSectionCardGridRightColumn,
} from '@/components/ui/PageSectionCardGrid'
import { PageSectionCardNumber } from '@/components/ui/PageSectionCardNumber'
import { Heading } from '@/components/ui/typography/Heading'

import styles from './index.module.scss'

export const PageSectionCardHeader: React.FC<{
    title: string
    description?: string
    number?: number
}> = ({ title, description, number }) => {
    return (
        <PageSectionCardGrid>
            {number && (
                <PageSectionCardGridLeftColumn>
                    <PageSectionCardNumber number={number} className={styles.number} />
                </PageSectionCardGridLeftColumn>
            )}
            <PageSectionCardGridRightColumn className={styles.text}>
                <Heading level={1}>{title}</Heading>
                {description && (
                    <Text className={styles.description} type="pL">
                        {description}
                    </Text>
                )}
            </PageSectionCardGridRightColumn>
        </PageSectionCardGrid>
    )
}
