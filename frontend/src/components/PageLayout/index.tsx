import cn from 'classnames'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

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
    const router = useRouter()

    const mainElementRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const handleRouteChange = () => {
            if (mainElementRef.current) {
                window.scrollTo({ top: 0, behavior: 'instant' })
            }
        }

        router.events.on('routeChangeComplete', handleRouteChange)

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router])

    return (
        <div className={styles.layout}>
            {seo && (
                <Head>
                    <title>{seo.title || 'PT Security'}</title>
                    {seo.description && <meta name="description" content={seo.description} />}
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/images/favicons/favicon.ico" sizes="any" />
                    <link rel="icon" href="/images/favicons/icon.svg" type="image/svg+xml" />
                    <link rel="apple-touch-icon" href="/images/favicons/apple-touch-icon.png" />
                </Head>
            )}
            {headerData && <Header data={headerData} />}
            <main id="main" ref={mainElementRef} className={cn(styles.main, className)}>
                {children}
                {footerData && <Footer className={footerClassName} footerData={footerData} />}
            </main>
        </div>
    )
}
