import cn from 'classnames'
import Image from 'next/image'
import NextLink from 'next/link'
import React from 'react'

import { Text } from '@/components/ui/typography/Text'
import { TImage } from '@/types'
import { formatDate } from '@/utils/date'
import { useLocale } from '@/utils/translate'

import styles from './index.module.scss'

export type TNews = {
    title: string
    date?: Date
    image?: TImage
    href: string
    className?: string
}

export const NewsCard: React.FC<TNews> = ({ title, date, image, href, className }) => {
    const locale = useLocale()
    return (
        <NextLink href={href} className={cn(styles.card, className)}>
            <div className={styles.imageWrapper}>
                {image && (
                    <Image
                        src={image.src}
                        alt={title}
                        width={image.width}
                        height={image.height}
                        className={styles.image}
                    />
                )}
            </div>
            <div className={styles.info}>
                {date && <p className={styles.date}>{formatDate(date, locale)}</p>}
                <Text type="pM" className={styles.text}>
                    {title}
                </Text>
            </div>
        </NextLink>
    )
}
