import i18n from 'i18next'
import mapValues from 'lodash/mapValues'

import en from './locales/en.json'
import es from './locales/es.json'

export type TLocale = 'en' | 'es'

export const defaultLocale: TLocale = 'en'

export const defaultNS = 'validation'

export type TLocaleResource = typeof en

type TLocaleConfig = {
    name: string
    abbr: string
    sources: TLocaleResource
}
export type TLocaleResources = { [key in TLocale]: TLocaleConfig }

export const locales: TLocaleResources = {
    en: {
        name: 'English',
        abbr: 'En',
        sources: en,
    },
    es: {
        name: 'Spanish',
        abbr: 'Es',
        sources: es,
    },
}

i18n.init({
    fallbackLng: defaultLocale,
    ns: [defaultNS],
    resources: mapValues(locales, (l) => l.sources),
    defaultNS: defaultNS,
})

export const createTranslator = (locale: TLocale) => {
    return i18n.cloneInstance({ lng: locale })
}
