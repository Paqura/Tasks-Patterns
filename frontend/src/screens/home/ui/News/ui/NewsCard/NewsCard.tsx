import cn from 'classnames'
import Image from 'next/image'
import NextLink from 'next/link'

import { formatDate } from '@/shared/lib/date'
import { useLocale } from '@/shared/lib/translate'
import { Text } from '@/shared/ui/common/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'

export type TNewsCardProps = {
    title: string
    date?: Date
    image: TImage | null
    href: string
    className?: string
}

export const NewsCard = ({ title, date, image, href, className }: TNewsCardProps) => {
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
