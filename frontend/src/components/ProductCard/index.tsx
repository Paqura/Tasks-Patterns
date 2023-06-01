import Image from 'next/image'
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
    data: TProductCard
}

export const ProductCard: React.FC<TProps> = ({ data }) => {
    const { icon, title, description, href } = data
    return (
        <div className={styles.card}>
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

            <Link href={`/products/${href}`} type="m" className={styles.link}>
                <span className={styles.linkText}>Read more</span>
            </Link>
        </div>
    )
}