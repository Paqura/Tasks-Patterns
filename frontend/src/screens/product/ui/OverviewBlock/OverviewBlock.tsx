import { Heading } from '@/shared/ui/common/typography/Heading'
import { MarkdownContent } from '@/shared/ui/project/MarkdownContent'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'

export type TOverviewBlockData = {
    title: string
    content: string
}

type TOverviewBlockProps = {
    data: TOverviewBlockData
    sectionId: string
    number: number
}

export const OverviewBlock = ({ data, sectionId, number }: TOverviewBlockProps) => {
    return (
        <PageSection.Card mode={'light'} sectionId={sectionId}>
            <div className={styles.header}>
                <Heading level={1}>{data.title}</Heading>
                <PageSection.CardNumber number={number} className={styles.number} />
            </div>

            <MarkdownContent className={styles.content}>{data.content}</MarkdownContent>
        </PageSection.Card>
    )
}
