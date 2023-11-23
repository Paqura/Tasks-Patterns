export const formatDate = (date: Date | string, locale: Intl.LocalesArgument) =>
    new Date(date).toLocaleDateString(locale, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
