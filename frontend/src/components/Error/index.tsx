import { MarkdownContent } from '@/components/ui/MarkdownContent'
import { PageSection } from '@/components/ui/PageSection'
import { Heading } from '@/components/ui/typography/Heading'

import styles from './index.module.scss'

export type TErrorData = {
    title: string
    description: string
}

type TErrorProps = {
    data: TErrorData
}

export const Error: React.FC<TErrorProps> = ({ data }) => {
    return (
        <PageSection className={styles.section}>
            <div className={styles.content}>
                <Heading className={styles.title} level={2}>
                    {data.title}
                </Heading>
                <MarkdownContent mode={'dark'} className={styles.description}>
                    {data.description}
                </MarkdownContent>
            </div>
        </PageSection>
    )
}
