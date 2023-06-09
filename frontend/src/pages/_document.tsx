import { Html, Head, Main, NextScript } from 'next/document'

import { YaMetrika } from '@/components/YaMetrica'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <YaMetrika />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
