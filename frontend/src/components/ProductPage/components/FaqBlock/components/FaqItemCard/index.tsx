import Image from 'next/image'
import React from 'react'

import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'

export type TFaqItem = {
    question: string
    answer: string
    icon: TImage | null
}

type TProps = {
    data: TFaqItem
}

export const FaqItemCard: React.FC<TProps> = ({ data }) => {
    const { question, answer, icon } = data

    return (
        <div className={styles.card}>
            <div className={styles.questionBlock}>
                {icon && (
                    <Image
                        className={styles.image}
                        src={icon.src}
                        width={icon.width}
                        height={icon.height}
                        alt={icon.alt || ''}
                    />
                )}
                <Heading level={3}>{question}</Heading>
            </div>
            <Text className={styles.answer} type="pM">
                {answer}
            </Text>
        </div>
    )
}
