import Head from 'next/head'
import React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { TNavItem } from '@/types'

import styles from './index.module.scss'

export type TSeo = {
    title?: string
    description?: string
}

type TProps = {
    seo: TSeo
    navItems: TNavItem[]
}

export const PageLayout: React.FC<React.PropsWithChildren<TProps>> = ({
    seo,
    navItems,
    children,
}) => {
    return (
        <div className={styles.layout}>
            <Head>
                <title>{seo.title || 'PT Security'}</title>
                {seo.description && <meta name="description" content={seo.description} />}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header navItems={navItems} />
            <main className={styles.main}>
                {children}
                <Footer />
            </main>
        </div>
    )
}
