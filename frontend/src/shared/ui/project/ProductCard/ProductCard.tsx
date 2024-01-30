import cn from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useTranslate } from '@/services/translation'
import { Link } from '@/shared/ui/common/Link'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'

export type TProductCard = {
    title: string
    description?: string
    icon: TImage
    href: string
}

export type TProductCardProps = {
    className?: string
    data: TProductCard
}

export const ProductCard = ({ className, data }: TProductCardProps) => {
    const router = useRouter()
    const translate = useTranslate()

    const { icon, title, description, href } = data
    const productUrl = `/products/${href}`

    return (
        <div className={cn(styles.card, className)} onClick={() => router.push(productUrl)}>
            <div className={styles.content}>
                <div className={styles.icon}>
                    <Image src={icon.src} alt="" width={icon.width} height={icon.height} />
                </div>
                <Heading className={styles.title} level={3}>
                    {title}
                </Heading>
                <Text className={styles.description} type="pM">
                    {description}
                </Text>
            </div>

            <Link href={productUrl} type="m" classes={{ root: styles.link }}>
                <span className={styles.linkText}>{translate('productCard.readMoreBtn')}</span>
            </Link>
        </div>
    )
}
