export const formatDate = (date: Date | string) =>
    new Date(date).toLocaleDateString('en-EN', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
