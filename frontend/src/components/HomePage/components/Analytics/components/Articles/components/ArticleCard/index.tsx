import Link from 'next/link'
import React from 'react'

import { Text } from '@/components/ui/typography/Text'
import { formatDate } from '@/utils/date'
import { useLocale } from '@/utils/translate'

import styles from './index.module.scss'

type TProps = {
    title: string
    tag?: string
    date?: Date
    href: string
}

export const ArticleCard: React.FC<TProps> = ({ title, tag, date, href }) => {
    const locale = useLocale()
    return (
        <Link href={href} className={styles.card}>
            {tag && (
                <Text className={styles.tag} type="pS">
                    {tag}
                </Text>
            )}
            <div className={styles.content}>
                <Text className={styles.date} type="postscript">
                    {date && formatDate(date, locale)}
                </Text>
                <Text className={styles.title} type="pM">
                    {title}
                </Text>
            </div>
        </Link>
    )
}
