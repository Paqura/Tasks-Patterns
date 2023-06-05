import cn from 'classnames'
import { marked } from 'marked'
import React from 'react'

import { sanitizeText } from '@/utils/sanitize'

import styles from './index.module.scss'

type TCardMode = 'light' | 'dark'

type TProps = {
    children: string
    className?: string
    mode?: TCardMode
}

export const MarkdownContent: React.FC<TProps> = ({ children, className, mode = 'light' }) => {
    return (
        <div
            className={cn(styles.content, styles[`content_mode_${mode}`], className)}
            dangerouslySetInnerHTML={{
                __html: sanitizeText(marked.parse(children)),
            }}
        />
    )
}
