import cn from 'classnames'
import Image from 'next/image'
import NextLink from 'next/link'
import React, { PropsWithChildren } from 'react'

import { useTypographyTheme } from '@/shared/ui/common/typography/TypographyTheme'

import styles from './index.module.scss'

import arrowIcon from '/public/images/common/arrows-right.svg'

type TButtonType = 'button' | 'reset' | 'submit'
type TButtonSize = 'm' | 's'

type TButtonProps = {
    type?: TButtonType
    link?: string
    isTargetBlank?: boolean
    size?: TButtonSize
    withIcon?: boolean
    className?: string
    onClick?: React.MouseEventHandler
    download?: boolean
    disabled?: boolean
    loading?: boolean
}

export const Button = ({
    type = 'button',
    link,
    isTargetBlank = false,
    size = 'm',
    withIcon = true,
    className,
    children,
    onClick,
    download,
    disabled,
    loading,
}: PropsWithChildren<TButtonProps>) => {
    const theme = useTypographyTheme() || 'light'

    const classNames = cn(
        className,
        styles.button,
        styles[`button_size_${size}`],
        styles[`button_theme_${theme}`],
        { [styles.loading]: loading, [styles.disabled]: disabled },
    )

    const renderContent = () => {
        const content = typeof children === 'string' ? <span>{children}</span> : children

        return (
            <>
                <span>{content}</span>
                {size === 'm' && withIcon && (
                    <Image className={styles.arrow} src={arrowIcon} alt="" />
                )}
            </>
        )
    }

    if (link)
        return (
            <NextLink
                href={link}
                className={classNames}
                onClick={onClick}
                download={download}
                target={isTargetBlank ? '_blank' : undefined}
            >
                {renderContent()}
            </NextLink>
        )

    return (
        <button type={type} className={classNames} onClick={onClick} disabled={disabled}>
            {renderContent()}
        </button>
    )
}