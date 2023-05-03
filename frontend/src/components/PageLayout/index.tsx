import Head from 'next/head'
import React from 'react'

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
            <main>{children}</main>
        </div>
    )
}
