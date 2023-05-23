import cn from 'classnames'
import React from 'react'

import styles from './index.module.scss'

type TButton = {
    className?: string
    isActive?: boolean
    size?: 'm' | 'l'
    hasBorder?: boolean
    onClick: () => void
}

export const Button: React.FC<React.PropsWithChildren<TButton>> = ({
    className,
    isActive = false,
    size = 'm',
    hasBorder = true,
    onClick,
    children,
}) => {
    return (
        <button
            type="button"
            className={cn(className, styles.button, {
                [styles.active]: isActive,
                [styles.sizeL]: size === 'l',
                [styles.hasBorder]: hasBorder,
            })}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
