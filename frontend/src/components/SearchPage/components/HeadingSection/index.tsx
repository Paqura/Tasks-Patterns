import { PageSection } from '@/components/ui/PageSection'
import { Heading } from '@/components/ui/typography/Heading'

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

export const HeadingSection: React.FC<THeadingSectionProps> = ({ hasNoResults, data }) => {
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
