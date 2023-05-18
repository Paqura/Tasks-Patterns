import NextLink from 'next/link'

import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { formatDate } from '@/utils/date'

import styles from './index.module.scss'

export type TArticleData = {
    title: string
    description: string
    date?: Date
    href: string
}

type TArticleProps = TArticleData

export const Article: React.FC<TArticleProps> = ({ title, description, date, href }) => {
    return (
        <article className={styles.article}>
            <Text type="pM" className={styles.date}>
                {date && formatDate(date)}
            </Text>

            <div className={styles.content}>
                <Heading level={3} className={styles.title}>
                    {title}
                </Heading>
                <Text type="pM" className={styles.description}>
                    {description}
                </Text>
                <NextLink href={href} className={styles.link}>
                    <Text type="postscript">CONTINUE READING</Text>
                </NextLink>
            </div>
        </article>
    )
}
