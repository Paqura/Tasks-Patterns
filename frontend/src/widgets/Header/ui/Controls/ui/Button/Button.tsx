import cn from 'classnames'
import { PropsWithChildren } from 'react'

import styles from './index.module.scss'

type TButtonProps = {
    className?: string
    isActive?: boolean
    size?: 'm' | 'l'
    hasBorder?: boolean
    onClick: () => void
}

export const Button = ({
    className,
    isActive = false,
    size = 'm',
    hasBorder = true,
    onClick,
    children,
}: PropsWithChildren<TButtonProps>) => {
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
