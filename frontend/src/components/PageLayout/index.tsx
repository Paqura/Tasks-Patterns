import Head from 'next/head'
import React from 'react'

type Props = {}

export const PageLayout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
    return (
        <div>
            <Head>
                <title>Positive Technologies</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>{children}</main>
        </div>
    )
}
