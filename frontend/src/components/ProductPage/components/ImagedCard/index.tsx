import cn from 'classnames'
import Image from 'next/image'
import React from 'react'

import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { useTypographyTheme } from '@/components/ui/typography/TypographyTheme'
import { TImage } from '@/types'

import styles from './index.module.scss'

export type TImagedCard = { title: string; description?: string; image: TImage }

type TProps = {
    data: TImagedCard
}

export const ImagedCard: React.FC<TProps> = ({ data }) => {
    const { title, description, image } = data

    const theme = useTypographyTheme()

    return (
        <div className={cn(styles.task, styles[`theme_${theme}`])}>
            <Image
                className={styles.image}
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt || ''}
            />
            <div className={styles.textContent}>
                <Heading level={3}>{title}</Heading>
                <Text className={styles.description} type="pM">
                    {description}
                </Text>
            </div>
        </div>
    )
}
