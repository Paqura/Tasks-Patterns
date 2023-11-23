import { Heading } from '@/shared/ui/common/typography/Heading'
import { MarkdownContent } from '@/shared/ui/project/MarkdownContent'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'

export type TErrorData = {
    title: string
    description: string
}

export type TErrorProps = {
    data: TErrorData
}

export const Error = ({ data }: TErrorProps) => {
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
