import cn from 'classnames'

import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'

export type THeadingSectionData = {
    title: string
    description: string
}

export type THeadingSectionProps = {
    className?: string
    data: THeadingSectionData
}

export const HeadingSection = ({ className, data }: THeadingSectionProps) => {
    return (
        <PageSection className={cn(styles.headingSection, className)}>
            <div className={styles.content}>
                <Heading level={1} className={styles.title}>
                    {data.title}
                </Heading>

                <Text type="pL" className={styles.description}>
                    {data.description}
                </Text>
            </div>
        </PageSection>
    )
}
