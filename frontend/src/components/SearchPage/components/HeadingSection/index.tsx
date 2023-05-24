import { PageSection } from '@/components/ui/PageSection'
import { Heading } from '@/components/ui/typography/Heading'

import styles from './index.module.scss'

export type THeadingSectionData = {
    searchQuery: string
}

type THeadingSectionProps = {
    data: THeadingSectionData
}

export const HeadingSection: React.FC<THeadingSectionProps> = ({ data }) => {
    return (
        <PageSection className={styles.section}>
            <Heading level={2} className={styles.text}>
                Search results for &quot;
                <span className={styles.textHighlight}>{data.searchQuery}</span>&quot;
            </Heading>
        </PageSection>
    )
}
