import Head from 'next/head'
import React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export type TSeo = {
    title?: string
    description?: string
}

type TProps = {
    seo: TSeo
}

export const PageLayout: React.FC<React.PropsWithChildren<TProps>> = ({ seo, children }) => {
    return (
        <div>
            <Head>
                <title>{seo.title || 'PT Security'}</title>
                {seo.description && <meta name="description" content={seo.description} />}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}
