import cn from 'classnames'
import React from 'react'

import { TTextType } from '@/components/ui/typography/types'
import { useTypographyTheme } from '@/components/ui/typography/TypographyTheme'

import styles from './index.module.scss'

type TTextProps = React.HTMLAttributes<HTMLHeadingElement> & {
    type: TTextType
    className?: string
}

export const Text = (props: TTextProps) => {
    const { type, className, children } = props

    const theme = useTypographyTheme()

    const classNames = cn(
        className,
        styles.text,
        styles[`text_type_${type}`],
        theme?.textClasses[type]
    )

    return <p className={classNames}>{children}</p>
}
