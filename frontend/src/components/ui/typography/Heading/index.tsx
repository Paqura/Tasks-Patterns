import cn from 'classnames'
import React from 'react'

import { THeadingLevel } from '@/components/ui/typography/types'
import { useTypographyTheme } from '@/components/ui/typography/TypographyTheme'
import { sanitizeText } from '@/utils/sanitize'

import styles from './index.module.scss'

type THeadingProps = {
    className?: string
    level: THeadingLevel
    disableInjections?: boolean
}

export const Heading: React.FC<React.PropsWithChildren<THeadingProps>> = ({
    level = 1,
    className,
    children,
    disableInjections,
}) => {
    const theme = useTypographyTheme()
    const classNames = cn(className, styles.base, styles[`level_${level}`], {
        [styles[`theme_${theme}__level_${level}`]]: !!theme,
    })

    const sanitazedContent = React.Children.map(children, (child) => {
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
        sanitazedContent
    )
}
