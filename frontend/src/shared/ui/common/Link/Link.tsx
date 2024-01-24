import cn from 'classnames'
import NextLink, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

import { useTypographyTheme } from '@/shared/ui/common/typography/TypographyTheme'

import styles from './index.module.scss'

export type TLinkProps = {
    classes?: TClasses<'root'>
    type: 'm' | 's'
} & LinkProps

export const Link = ({ children, classes, type, ...otherProps }: PropsWithChildren<TLinkProps>) => {
    const theme = useTypographyTheme()

    return (
        <NextLink
            className={cn(
                styles.root,
                styles[`type_${type}`],
                {
                    [styles[`theme_${theme}`]]: Boolean(theme),
                },
                classes?.root,
            )}
            {...otherProps}
        >
            {children}
        </NextLink>
    )
}
