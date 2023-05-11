import cn from 'classnames'
import NextLink from 'next/link'
import React, { PropsWithChildren } from 'react'

import styles from './index.module.scss'

interface IButton {
    link?: string
    size?: 'm' | 's'
    className?: string
}

export const Button: React.FC<PropsWithChildren<IButton>> = ({
    link,
    size = 'm',
    className,
    children,
}) => {
    return link ? (
        <NextLink
            href={link}
            className={cn(className, styles.button, styles[`button__size_${size}`])}
        >
            {children}
        </NextLink>
    ) : (
        <button
            type="button"
            className={cn(className, styles.button, styles[`button__size_${size}`])}
        >
            {children}
        </button>
    )
}
