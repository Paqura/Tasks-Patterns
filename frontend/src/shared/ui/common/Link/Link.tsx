import cn from 'classnames'
import NextLink, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

import { useTypographyTheme } from '@/shared/ui/common/typography/TypographyTheme'

import styles from './index.module.scss'

export type TLinkProps = {
    className?: string
    type: 'm' | 's'
} & LinkProps

export const Link = ({
    children,
    className,
    type,
    ...otherProps
}: PropsWithChildren<TLinkProps>) => {
    const theme = useTypographyTheme()

    return (
        <NextLink
            className={cn(
                styles.link,
                styles[`type_${type}`],
                { [styles[`theme_${theme}`]]: !!theme },
                className,
            )}
            {...otherProps}
        >
            {children}
        </NextLink>
    )
}
