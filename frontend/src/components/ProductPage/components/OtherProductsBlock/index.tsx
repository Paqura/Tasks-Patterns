import React from 'react'

import { ProductCard, TProductCard } from '@/components/ProductCard'
import { CardsSlider } from '@/components/ui/CardsSlider'
import { Link } from '@/components/ui/Link'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'
import { useTranslate } from '@/utils/translate'

import styles from './index.module.scss'

export type TOtherProductsBlockData = {
    title: string
    description?: string
    items: TProductCard[]
}

type TProps = {
    number: number
    sectionId: string
    data: TOtherProductsBlockData
}

export const OtherProductsBlock: React.FC<TProps> = ({ data, sectionId, number }) => {
    const { items, title, description } = data
    const translate = useTranslate()

    return (
        <PageSectionCard mode="dark" sectionId={sectionId}>
            <PageSectionCardHeader title={title} description={description} number={number} />
            <CardsSlider
                className={styles.productsList}
                scrollAreaClassName={styles.productsScrollArea}
                controls={
                    <Link type="s" href={'/products'}>
                        {translate('product.viewAllProductsBtn')}
                    </Link>
                }
            >
                {items.map((product, index) => (
                    <ProductCard key={index} data={product} />
                ))}
            </CardsSlider>
        </PageSectionCard>
    )
}
