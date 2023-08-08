import type { AppProps } from 'next/app'

import '@/styles/globals.scss'
import { TranslationProvider } from '@/utils/translate'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <TranslationProvider>
            <Component {...pageProps} />
        </TranslationProvider>
    )
}
