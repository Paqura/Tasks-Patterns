import React from 'react'

import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'

import { Clients } from './components/Clients'
import { ProductCard } from './components/ProductCard'
import styles from './index.module.scss'

import solutionsIcon from 'public/images/advantages/comprehensive-solutions.svg'

const title = 'Our Products'
const description = `At&nbsp;PT&nbsp;Security, we&nbsp;take a&nbsp;comprehensive approach to&nbsp;cybersecurity. Our solutions are designed to&nbsp;protect your business from a&nbsp;wide range of&nbsp;threats, both internal and external.`

type TProductData = {
    title: string
    description: string
    icon: string
}

const products: TProductData[] = [
    {
        title: 'MaxPatrol SIEM',
        description: 'Real-time detection of IS incidents',
        icon: solutionsIcon,
    },
    {
        title: 'MaxPatrol VM',
        description: 'A new generation system for vulnerability management',
        icon: solutionsIcon,
    },
    {
        title: 'PT Sandbox',
        description: 'The first sandbox that protects exactly your infrastructure',
        icon: solutionsIcon,
    },
    {
        title: 'PT ISIM',
        description: 'Management of cyber security incidents of the APCS',
        icon: solutionsIcon,
    },
    {
        title: 'PT BlackBox',
        description: 'Dynamic application analyser',
        icon: solutionsIcon,
    },
    {
        title: 'XSpider',
        description: 'Vulnerability scanner',
        icon: solutionsIcon,
    },

    {
        title: 'PT Application Inspector',
        description: 'Application security analyser',
        icon: solutionsIcon,
    },
    {
        title: 'PT Network Attack Discovery',
        description: 'Traffic Analysis System (NTA) for attack detection',
        icon: solutionsIcon,
    },
]

export const Products: React.FC<{}> = () => {
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
                    />
                ))}
            </div>
            <div className={styles.welcomeToContact}>
                <Clients />
            </div>
        </PageSectionCard>
    )
}
