import cn from 'classnames'
import React from 'react'

import { THeadingLevel } from '@/components/ui/typography/types'
import { useTypographyTheme } from '@/components/ui/typography/TypographyTheme'

import styles from './index.module.scss'

type THeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
    level: THeadingLevel
}

export const Heading = (props: THeadingProps) => {
    const { level = 1, className, children, ...restProps } = props

    const theme = useTypographyTheme()
    const classNames = cn(className, styles.base, styles[`level_${level}`], {
        [styles[`theme_${theme}__level_${level}`]]: !!theme,
    })

    return React.createElement(
        `h${level}` as React.ElementType,
        {
            className: classNames,
            ...restProps,
        },
        children
    )
}
