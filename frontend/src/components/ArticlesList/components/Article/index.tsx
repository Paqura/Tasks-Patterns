import cn from 'classnames'
import Image from 'next/image'

import { Link } from '@/components/ui/Link'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { TImage } from '@/types'
import { formatDate } from '@/utils/date'

import styles from './index.module.scss'

export type TArticlePreviewData = {
    title: string
    topic: string
    date?: Date
    image?: TImage
    withImage?: boolean
    href: string
}

type TArticlePreviewProps = TArticlePreviewData

export const Article: React.FC<TArticlePreviewProps> = ({
    title,
    topic,
    date,
    image,
    withImage,
    href,
}) => {
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
                {date && formatDate(date)}
            </Text>

            <div className={styles.content}>
                <Heading level={3} className={styles.title}>
                    {title}
                </Heading>

                <Text type="pM" className={styles.description}>
                    {topic}
                </Text>

                <Link type="s" href={href}>
                    CONTINUE READING
                </Link>
            </div>
        </article>
    )
}
