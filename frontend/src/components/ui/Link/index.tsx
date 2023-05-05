import cn from 'classnames'
import NextLink, { LinkProps } from 'next/link'
import React from 'react'

import { useTypographyTheme } from '@/components/ui/typography/TypographyTheme'

import styles from './index.module.scss'

export type TLinkProps = {
    className?: string
    type: 'm' | 's'
} & LinkProps

export const Link: React.FC<React.PropsWithChildren<TLinkProps>> = ({
    children,
    className,
    type,
    ...otherProps
}) => {
    const theme = useTypographyTheme()

    return (
        <NextLink
            className={cn(
                styles.link,
                styles[`type_${type}`],
                { [styles[`theme_${theme}`]]: !!theme },
                className
            )}
            {...otherProps}
        >
            {children}
        </NextLink>
    )
}
