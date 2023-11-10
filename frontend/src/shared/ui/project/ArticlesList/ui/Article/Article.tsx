import cn from 'classnames'
import Image from 'next/image'

import { formatDate } from '@/shared/lib/date'
import { useLocale, useTranslate } from '@/shared/lib/translate'
import { Link } from '@/shared/ui/common/Link'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'

export type TArticlePreviewData = {
    title: string
    topic: string
    date?: Date
    image: TImage | null
    withImage?: boolean
    href: string
}

export type TArticleProps = TArticlePreviewData

export const Article = ({ title, topic, date, image, withImage, href }: TArticleProps) => {
    const translate = useTranslate()
    const locale = useLocale()

    return (
        <article className={cn(styles.article, { [styles.hasImage]: Boolean(withImage) })}>
            {withImage && image && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={image.src}
                        alt={title}
                        width={image.width}
                        height={image.height}
                        className={styles.image}
                    />
                </div>
            )}

            <Text type="pM" className={styles.date}>
                {date && formatDate(date, locale)}
            </Text>

            <div className={styles.content}>
                <Heading level={3} className={styles.title}>
                    {title}
                </Heading>

                <Text type="pM" className={styles.description}>
                    {topic}
                </Text>

                <Link type="s" href={href}>
                    {translate('articlesList.continueReadingBtn')}
                </Link>
            </div>
        </article>
    )
}
