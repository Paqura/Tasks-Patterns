import cn from 'classnames'
import DOMPurify from 'isomorphic-dompurify'
import { marked } from 'marked'
import React from 'react'

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
                __html: DOMPurify.sanitize(marked.parse(children)),
            }}
        />
    )
}
