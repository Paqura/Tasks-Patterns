import Image from 'next/image'
import React from 'react'

import { PageSection } from '@/components/ui/PageSection'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'

export const ArticleHeader: React.FC<{ image: TImage | null; title: string; topic: string }> = (
    props
) => {
    return (
        <div className={styles.banner}>
            {props.image && (
                <Image
                    className={styles.imageBg}
                    src={props.image.src}
                    fill={true}
                    alt={props.image.alt || ''}
                    priority={true}
                />
            )}
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
        </div>
    )
}
