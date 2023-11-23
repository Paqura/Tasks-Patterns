import { Head, Html, Main, NextScript } from 'next/document'

import { YaMetric } from '@/services/yaMetric'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <YaMetric />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
