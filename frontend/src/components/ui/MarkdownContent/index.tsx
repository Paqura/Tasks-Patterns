import cn from 'classnames'
import { marked } from 'marked'
import React from 'react'

import { sanitizeText } from '@/utils/sanitize'

import styles from './index.module.scss'

type TProps = {
    children: string
    className?: string
}

export const MarkdownContent: React.FC<TProps> = ({ children, className }) => {
    return (
        <div
            className={cn(styles.content, className)}
            dangerouslySetInnerHTML={{
                __html: sanitizeText(marked.parse(children)),
            }}
        />
    )
}
