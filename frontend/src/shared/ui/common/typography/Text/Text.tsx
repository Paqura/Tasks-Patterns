import cn from 'classnames'
import React from 'react'

import { sanitizeText } from '@/shared/lib/sanitize'
import { TTextType } from '@/shared/ui/common/typography/types'
import { useTypographyTheme } from '@/shared/ui/common/typography/TypographyTheme'

import styles from './index.module.scss'

type TTextProps = React.HTMLAttributes<HTMLHeadingElement> & {
    type: TTextType
    className?: string
}

export const Text = ({ type, className, children }: TTextProps) => {
    const theme = useTypographyTheme()

    const classNames = cn(className, styles.base, styles[`type_${type}`], {
        [styles[`theme_${theme}__type_${type}`]]: !!theme,
    })

    const sanitizedContent = React.Children.map(children, (child) => {
        const isStringContent = typeof child === 'string'

        if (isStringContent) {
            return React.createElement('span', {
                dangerouslySetInnerHTML: { __html: sanitizeText(child) },
            })
        }
        return child
    })

    return <div className={classNames}>{sanitizedContent}</div>
}
