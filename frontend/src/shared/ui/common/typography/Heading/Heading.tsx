import cn from 'classnames'
import React, { PropsWithChildren } from 'react'

import { sanitizeText } from '@/shared/lib/sanitize'
import { THeadingLevel } from '@/shared/ui/common/typography/types'
import { useTypographyTheme } from '@/shared/ui/common/typography/TypographyTheme'

import styles from './index.module.scss'

type THeadingProps = {
    className?: string
    level: THeadingLevel
    disableInjections?: boolean
}

export const Heading = ({
    level = 1,
    className,
    children,
    disableInjections,
}: PropsWithChildren<THeadingProps>) => {
    const theme = useTypographyTheme()
    const classNames = cn(className, styles.base, styles[`level_${level}`], {
        [styles[`theme_${theme}__level_${level}`]]: !!theme,
    })

    const sanitizedContent = React.Children.map(children, (child) => {
        const isStringContent = typeof child === 'string'

        if (isStringContent) {
            return disableInjections
                ? child
                : React.createElement('span', {
                      dangerouslySetInnerHTML: { __html: sanitizeText(child) },
                  })
        }
        return child
    })

    return React.createElement(
        `h${level}` as React.ElementType,
        {
            className: classNames,
        },
        sanitizedContent,
    )
}
