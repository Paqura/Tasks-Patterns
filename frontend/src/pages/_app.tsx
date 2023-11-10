import type { AppProps } from 'next/app'

import { TranslationProvider } from '@/shared/lib/translate'
import '@/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <TranslationProvider>
            <Component {...pageProps} />
        </TranslationProvider>
    )
}
