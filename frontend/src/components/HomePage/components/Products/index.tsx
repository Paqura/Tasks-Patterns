import React from 'react'

import { ProductCard, TProductCard } from '@/components/ProductCard'
import { CardsSlider } from '@/components/ui/CardsSlider'
import { Link } from '@/components/ui/Link'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'
import { TWithSectionParams } from '@/types'

import { Clients, TClientsData } from './components/Clients'
import styles from './index.module.scss'

export type TProductsBlockData = TWithSectionParams<{
    allProductsLinkText: string
    products: TProductCard[]
    clients?: TClientsData
}>

type TProps = {
    data: TProductsBlockData
}

export const Products: React.FC<TProps> = ({ data }) => {
    const { sectionId, title, description, allProductsLinkText, products, clients } = data

    return (
        <PageSectionCard mode="dark" sectionId={sectionId}>
            <PageSectionCardHeader title={title} description={description} />
            <CardsSlider
                className={styles.productsList}
                scrollAreaClassName={styles.productsScrollArea}
                controls={
                    <Link type="s" href={'/products'}>
                        {allProductsLinkText}
                    </Link>
                }
            >
                {products.map((product, index) => (
                    <ProductCard key={index} data={product} />
                ))}
            </CardsSlider>
            {clients && (
                <div className={styles.clients}>
                    <Clients data={clients} />
                </div>
            )}
        </PageSectionCard>
    )
}
