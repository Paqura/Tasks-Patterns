export const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('en-EN', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
