import cn from 'classnames'
import { marked } from 'marked'

import styles from './index.module.scss'

type TCardMode = 'light' | 'dark'

type TMarkdownContentProps = {
    children: string
    className?: string
    mode?: TCardMode
}

export const MarkdownContent = ({ children, className, mode = 'light' }: TMarkdownContentProps) => {
    return (
        <div
            className={cn(styles.content, styles[`content_mode_${mode}`], className)}
            dangerouslySetInnerHTML={{
                __html: marked.parse(children) as unknown as TrustedHTML,
            }}
        />
    )
}
