import cn from 'classnames'
import Image from 'next/image'
import NextLink from 'next/link'
import React, { PropsWithChildren } from 'react'

import { useTypographyTheme } from '@/components/ui/typography/TypographyTheme'

import styles from './index.module.scss'

import arrowIcon from '/public/images/common/arrows-right.svg'

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
        <NextLink href={link} className={classNames}>
            {renderContent()}
        </NextLink>
    ) : (
        <button type="button" className={classNames}>
            {renderContent()}
        </button>
    )
}
