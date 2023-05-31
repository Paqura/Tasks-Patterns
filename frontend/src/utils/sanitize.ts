import DOMPurify from 'isomorphic-dompurify'

export const sanitizeText = (text: string) => DOMPurify.sanitize(text)
