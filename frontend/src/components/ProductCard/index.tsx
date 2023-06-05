import cn from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import { Link } from '@/components/ui/Link'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'

export type TProductCard = {
    title: string
    description?: string
    icon: TImage
    href: string
}

type TProps = {
    className?: string
    data: TProductCard
}

export const ProductCard: React.FC<TProps> = ({ className, data }) => {
    const { icon, title, description, href } = data
    const productUrl = `/products/${href}`

    const router = useRouter()
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

            <Link href={productUrl} type="m" className={styles.link}>
                <span className={styles.linkText}>Read more</span>
            </Link>
        </div>
    )
}
