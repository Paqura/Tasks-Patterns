import cn from 'classnames'

import { PageSection } from '@/components/ui/PageSection'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

export type THeadingSectionData = {
    title: string
    description: string
}

type THeadingSectionProps = {
    className?: string
    data: THeadingSectionData
}

export const HeadingSection: React.FC<THeadingSectionProps> = ({ className, data }) => {
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
