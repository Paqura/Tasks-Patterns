import { PageSection } from '@/components/ui/PageSection'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

export default function HeaderArticle(props: { title: string; topic: string }) {
    return (
        <PageSection className={styles.section}>
            <div className={styles.header}>
                <Heading className={styles.title} level={2}>
                    {props.title}
                </Heading>
                <div className={styles.textWrapper}>
                    <Text className={styles.text} type="pL">
                        {props.topic}
                    </Text>
                </div>
            </div>
        </PageSection>
    )
}
