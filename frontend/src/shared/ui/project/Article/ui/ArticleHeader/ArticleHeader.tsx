import Image from 'next/image'

import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { PageSection } from '@/shared/ui/project/PageSection'
import { TImage } from '@/types'

import styles from './index.module.scss'

export type TArticleHeaderProps = {
    image: TImage | null
    title: string
    topic: string
}

export const ArticleHeader = ({ image, title, topic }: TArticleHeaderProps) => {
    return (
        <div className={styles.banner}>
            {image && (
                <Image
                    className={styles.imageBg}
                    src={image.src}
                    fill={true}
                    alt={image.alt || ''}
                    priority={true}
                />
            )}

            <PageSection className={styles.section}>
                <div className={styles.header}>
                    <Heading className={styles.title} level={2}>
                        {title}
                    </Heading>

                    <div className={styles.textWrapper}>
                        <Text className={styles.text} type="pL">
                            {topic}
                        </Text>
                    </div>
                </div>
            </PageSection>
        </div>
    )
}
