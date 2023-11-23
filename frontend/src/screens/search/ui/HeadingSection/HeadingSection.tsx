import { Heading } from '@/shared/ui/common/typography/Heading'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'

export type THeadingSectionData = {
    title: string
    hasNoResultsTitle: string
    searchQuery: string
}

type THeadingSectionProps = {
    hasNoResults: boolean
    data: THeadingSectionData
}

export const HeadingSection = ({ hasNoResults, data }: THeadingSectionProps) => {
    const { title, hasNoResultsTitle, searchQuery } = data

    const titleToRender = hasNoResults ? hasNoResultsTitle : title

    return (
        <PageSection className={styles.section}>
            <Heading level={2} className={styles.text}>
                {titleToRender} &quot;
                <span className={styles.textHighlight}>{searchQuery}</span>&quot;
            </Heading>
        </PageSection>
    )
}
