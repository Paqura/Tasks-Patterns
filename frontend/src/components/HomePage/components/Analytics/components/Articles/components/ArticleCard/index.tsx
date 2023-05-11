import React from 'react'

import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

type TProps = {
    title: string
    tag?: string
    date: Date
}

export const ArticleCard: React.FC<TProps> = ({ title, tag, date }) => {
    return (
        <div className={styles.card}>
            <Text className={styles.tag} type="pS">
                {tag}
            </Text>
            <div className={styles.content}>
                <Text className={styles.date} type="postscript">
                    {date.toDateString()}
                </Text>
                <Text className={styles.title} type="pM">
                    {title}
                </Text>
            </div>
        </div>
    )
}
