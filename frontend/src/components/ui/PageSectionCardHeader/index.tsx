import React from 'react'

import { Text } from '@/components/ui//typography/Text'
import {
    PageSectionCardGrid,
    PageSectionCardGridRightColumn,
} from '@/components/ui/PageSectionCardGrid'
import { Heading } from '@/components/ui/typography/Heading'

import styles from './index.module.scss'

export const PageSectionCardHeader: React.FC<{ title: string; description?: string }> = ({
    title,
    description,
}) => {
    return (
        <PageSectionCardGrid>
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
