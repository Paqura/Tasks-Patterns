import React from 'react'

import { Text } from '@/components/ui//typography/Text'
import {
    PageSectionCardGrid,
    PageSectionCardGridLeftColumn,
    PageSectionCardGridRightColumn,
} from '@/components/ui/PageSectionCardGrid'
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
                    <Heading level={2} className={styles.number}>
                        {number.toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false,
                        })}
                    </Heading>
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
