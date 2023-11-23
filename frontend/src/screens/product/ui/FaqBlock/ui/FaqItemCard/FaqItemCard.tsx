import Image from 'next/image'

import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'

export type TFaqItem = {
    question: string
    answer: string
    icon: TImage | null
}

type TFaqItemCardProps = {
    data: TFaqItem
}

export const FaqItemCard = ({ data }: TFaqItemCardProps) => {
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
