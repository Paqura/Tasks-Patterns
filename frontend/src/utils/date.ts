import { TLocale } from './i18n'

export const formatDate = (date: Date | string, locale: TLocale) =>
    new Date(date).toLocaleDateString(locale, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
