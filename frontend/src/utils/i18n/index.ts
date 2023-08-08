import i18n from 'i18next'

import en from './locales/en.json'
import es from './locales/es.json'
import pt from './locales/pt.json'

export type TLocale = 'en' | 'es' | 'pt'

export const defaultLocale: TLocale = 'en'

export const defaultNS = 'validation'

export type TLanguageResource = typeof en

export type TLanguageResources = { [key in TLocale]: TLanguageResource }

export const locales: TLanguageResources = {
    en: en,
    es: es,
    pt: pt,
}

i18n.init({
    fallbackLng: defaultLocale,
    ns: [defaultNS],
    resources: locales,
    defaultNS: defaultNS,
})

export const createTranslator = (locale: TLocale) => {
    return i18n.cloneInstance({ lng: locale })
}
