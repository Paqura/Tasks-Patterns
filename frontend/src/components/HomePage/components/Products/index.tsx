import React from 'react'

import { CardsSlider } from '@/components/ui/CardsSlider'
import { Link } from '@/components/ui/Link'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'
import { TImage } from '@/types'

import { Clients, TClient } from './components/Clients'
import { ProductCard } from './components/ProductCard'
import styles from './index.module.scss'

const title = 'Our Products'
const description = `At&nbsp;PT&nbsp;Security, we&nbsp;take a&nbsp;comprehensive approach to&nbsp;cybersecurity. Our solutions are designed to&nbsp;protect your business from a&nbsp;wide range of&nbsp;threats, both internal and external.`

export type TProduct = {
    title: string
    description?: string
    icon: TImage
    href: string
}

export type TProductsBlockData = {
    products: TProduct[]
    clients: TClient[]
}

type TProps = {
    data: TProductsBlockData
}

export const Products: React.FC<TProps> = ({ data }) => {
    const { products, clients } = data

    return (
        <PageSectionCard mode="dark" sectionId="products">
            <PageSectionCardHeader title={title} description={description} />
            <CardsSlider
                className={styles.productsList}
                scrollAreaClassName={styles.productsScrollArea}
                controls={
                    <Link type="s" href={'/products'}>
                        All products
                    </Link>
                }
            >
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        title={product.title}
                        description={product.description}
                        icon={product.icon}
                        href={product.href}
                    />
                ))}
            </CardsSlider>
            <div className={styles.clients}>
                <Clients clients={clients} />
            </div>
        </PageSectionCard>
    )
}
