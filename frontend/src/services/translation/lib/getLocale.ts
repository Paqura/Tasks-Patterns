import { TLocale, defaultLocale, locales } from './createTranslator'

const availableLocales = Object.keys(locales)

export const getLocale = (nextLocale?: string): TLocale => {
    return nextLocale && availableLocales.includes(nextLocale)
        ? (nextLocale as TLocale)
        : defaultLocale
}
