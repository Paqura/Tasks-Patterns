import React from 'react'

import { MarkdownContent } from '@/components/ui/MarkdownContent'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardNumber } from '@/components/ui/PageSectionCardNumber'
import { Heading } from '@/components/ui/typography/Heading'

import styles from './index.module.scss'

type TProps = {
    data: TOverviewBlockData
    sectionId: string
    number: number
}

export type TOverviewBlockData = {
    title: string
    content: string
}

export const OverviewBlock: React.FC<TProps> = ({ data, sectionId, number }) => {
    return (
        <PageSectionCard mode={'light'} sectionId={sectionId}>
            <div className={styles.header}>
                <Heading level={1}>{data.title}</Heading>
                <PageSectionCardNumber number={number} className={styles.number} />
            </div>
            <MarkdownContent className={styles.content}>{data.content}</MarkdownContent>
        </PageSectionCard>
    )
}
