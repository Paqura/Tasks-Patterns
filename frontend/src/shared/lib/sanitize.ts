import DOMPurify from 'isomorphic-dompurify'

const TEMPORARY_A_TARGET = 'data-sanitize-target'

DOMPurify.addHook('beforeSanitizeAttributes', function (node) {
    if (node.tagName === 'A') {
        const target = node.getAttribute('target')

        if (!target) return

        node.setAttribute(TEMPORARY_A_TARGET, target)
    }
})

DOMPurify.addHook('afterSanitizeAttributes', function (node) {
    if (node.tagName === 'A') {
        const target = node.getAttribute(TEMPORARY_A_TARGET)

        if (!target) return

        node.setAttribute('target', target)
    }
})

export const sanitizeText = (text: string) => DOMPurify.sanitize(text)
