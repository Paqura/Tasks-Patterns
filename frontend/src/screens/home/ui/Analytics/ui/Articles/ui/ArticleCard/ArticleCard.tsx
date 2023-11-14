import Link from 'next/link'

import { useLocale } from '@/services/translation'
import { formatDate } from '@/shared/lib/date'
import { Text } from '@/shared/ui/common/typography/Text'

import styles from './index.module.scss'

type TArticleCardProps = {
    title: string
    tag?: string
    date?: Date
    href: string
}

export const ArticleCard = ({ title, tag, date, href }: TArticleCardProps) => {
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
