import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef } from 'react'

import { TLocale, locales, createTranslator, defaultLocale } from './i18n'

type TTranslator = ReturnType<typeof createTranslator>

export type TTranslateFn = TTranslator['t']

const TranslationContext = React.createContext<TTranslator | undefined>(undefined)

const availableLocales = Object.keys(locales)

const getLocale = (nextLocale?: string): TLocale => {
    return nextLocale && availableLocales.includes(nextLocale)
        ? (nextLocale as TLocale)
        : defaultLocale
}

export const TranslationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { locale } = useRouter()
    const translatorRef = useRef<TTranslator>(createTranslator(getLocale(locale)))

    useEffect(() => {
        translatorRef.current.changeLanguage(getLocale(locale))
    }, [locale])

    return (
        <TranslationContext.Provider value={translatorRef.current}>
            {children}
        </TranslationContext.Provider>
    )
}

const fallback = (() => '') as TTranslateFn

const useTranslator = () => {
    return useContext(TranslationContext)
}

export const useLocale = () => {
    const { locale } = useRouter()
    return getLocale(locale)
}

export const useTranslate = () => {
    const translator = useTranslator()
    return translator ? translator.t : fallback
}
