import React from 'react'

import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'
import { TImage } from '@/types'

import { Clients, TClient } from './components/Clients'
import { ProductCard } from './components/ProductCard'
import styles from './index.module.scss'

import lukouilIcon from 'public/images/lukoil.svg'

const title = 'Our Products'
const description = `At&nbsp;PT&nbsp;Security, we&nbsp;take a&nbsp;comprehensive approach to&nbsp;cybersecurity. Our solutions are designed to&nbsp;protect your business from a&nbsp;wide range of&nbsp;threats, both internal and external.`

export type TProduct = {
    title: string
    description?: string
    icon: TImage
    href: string
}

const clients: TClient[] = [
    {
        name: 'Lukoil',
        logo: lukouilIcon,
    },
    {
        name: 'ING Bank',
        logo: lukouilIcon,
    },
    {
        name: 'SAMSUNG',
        logo: lukouilIcon,
    },
    {
        name: 'Kaspersky Lab',
        logo: lukouilIcon,
    },
    {
        name: 'ABBYY',
        logo: lukouilIcon,
    },
]

export type TProductsBlockData = {
    products: TProduct[]
    clients: TClient[]
}

type TProps = TProductsBlockData

export const Products: React.FC<TProps> = ({ products, clients }) => {
    return (
        <PageSectionCard mode="dark">
            <PageSectionCardHeader title={title} description={description} />

            <div className={styles.productsList}>
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        title={product.title}
                        description={product.description}
                        icon={product.icon}
                        href={product.href}
                    />
                ))}
            </div>
            <div className={styles.clients}>
                <Clients clients={clients} />
            </div>
        </PageSectionCard>
    )
}
