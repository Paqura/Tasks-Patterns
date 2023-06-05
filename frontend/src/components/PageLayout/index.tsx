import cn from 'classnames'
import Head from 'next/head'
import React from 'react'

import { Footer, TFooterData } from '@/components/Footer'
import { Header, THeaderData } from '@/components/Header'

import styles from './index.module.scss'

export type TSeo = {
    title?: string
    description?: string
}

type TProps = {
    seo?: TSeo
    headerData?: THeaderData
    footerData?: TFooterData
    className?: string
    footerClassName?: string
}

export const PageLayout: React.FC<React.PropsWithChildren<TProps>> = ({
    seo,
    headerData,
    footerData,
    children,
    className,
    footerClassName,
}) => {
    return (
        <div className={styles.layout}>
            {seo && (
                <Head>
                    <title>{seo.title || 'PT Security'}</title>
                    {seo.description && <meta name="description" content={seo.description} />}
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
            )}
            {headerData && <Header data={headerData} />}
            <main id="main" className={cn(styles.main, className)}>
                {children}
                {footerData && <Footer className={footerClassName} footerData={footerData} />}
            </main>
        </div>
    )
}
