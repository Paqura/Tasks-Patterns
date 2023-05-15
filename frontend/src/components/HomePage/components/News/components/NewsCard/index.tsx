import cn from 'classnames'
import Image from 'next/image'
import NextLink from 'next/link'
import React from 'react'

import { Text } from '@/components/ui/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'

export type TNews = {
    description: string
    date?: Date
    image: TImage
    href: string
    className?: string
}

export const NewsCard: React.FC<TNews> = ({ description, date, image, href, className }) => {
    const getFormattedDate = (date: Date) =>
        new Date(date).toLocaleDateString('en-EN', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })

    return (
        <NextLink href={href} className={cn(styles.card, className)}>
            <div className={styles.imageWrapper}>
                <Image
                    src={image.src}
                    alt={description}
                    width={image.width}
                    height={image.height}
                    className={styles.image}
                />
            </div>
            <div className={styles.info}>
                {date && <p className={styles.date}>{getFormattedDate(date)}</p>}
                <Text type="pM" className={styles.text}>
                    {description}
                </Text>
            </div>
        </NextLink>
    )
}
