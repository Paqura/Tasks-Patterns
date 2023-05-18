import { PageSection } from '@/components/ui/PageSection'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

export type THeaderData = {
    title: string
    description: string
}

type THeaderProps = THeaderData

export const Header: React.FC<THeaderProps> = (props) => {
    return (
        <PageSection className={styles.section}>
            <div className={styles.content}>
                <Heading level={1} className={styles.title}>
                    {props.title}
                </Heading>
                <Text type="pL" className={styles.description}>
                    {props.description}
                </Text>
            </div>
        </PageSection>
    )
}
