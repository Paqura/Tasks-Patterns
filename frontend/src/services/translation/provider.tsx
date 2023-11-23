import { useRouter } from 'next/router'
import { createContext, PropsWithChildren, useContext, useEffect, useRef } from 'react'

import { createTranslator, type TTranslator } from './lib/createTranslator'
import { getLocale } from './lib/getLocale'

const TranslationContext = createContext<TTranslator | null>(null)

export const useLocale = () => {
    const { locale } = useRouter()
    return getLocale(locale)
}

export const TranslationProvider = ({ children }: PropsWithChildren) => {
    const locale = useLocale()
    const translatorRef = useRef<TTranslator>(createTranslator(locale))

    useEffect(() => {
        translatorRef.current.changeLanguage(locale)
    }, [locale])

    return (
        <TranslationContext.Provider value={translatorRef.current}>
            {children}
        </TranslationContext.Provider>
    )
}

export const useTranslate = () => {
    const ctx = useContext(TranslationContext)

    if (!ctx) {
        throw new Error('Context not found')
    }

    return ctx.t
}
