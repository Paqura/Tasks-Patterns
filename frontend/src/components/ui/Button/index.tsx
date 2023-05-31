import cn from 'classnames'
import Image from 'next/image'
import NextLink from 'next/link'
import React, { PropsWithChildren } from 'react'

import { useTypographyTheme } from '@/components/ui/typography/TypographyTheme'

import styles from './index.module.scss'

import arrowIcon from '/public/images/common/arrows-right.svg'

interface IButton {
    type?: 'button' | 'reset' | 'submit'
    link?: string
    size?: 'm' | 's'
    className?: string
    onClick?: React.MouseEventHandler
}

export const Button: React.FC<PropsWithChildren<IButton>> = ({
    type = 'button',
    link,
    size = 'm',
    className,
    children,
    onClick,
}) => {
    const theme = useTypographyTheme() || 'light'

    const classNames = cn(
        className,
        styles.button,
        styles[`button_size_${size}`],
        styles[`button_theme_${theme}`]
    )

    const renderContent = () => {
        return (
            <>
                {children}
                {size === 'm' && <Image className={styles.arrow} src={arrowIcon} alt="" />}
            </>
        )
    }
    return link ? (
        <NextLink href={link} className={classNames} onClick={onClick}>
            {renderContent()}
        </NextLink>
    ) : (
        <button type={type} className={classNames} onClick={onClick}>
            {renderContent()}
        </button>
    )
}
