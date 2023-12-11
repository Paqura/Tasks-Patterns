import cn from 'classnames'
import { PropsWithChildren, forwardRef } from 'react'

import styles from './index.module.scss'

type TButtonProps = {
    className?: string
    isActive?: boolean
    size?: 'm' | 'l'
    hasBorder?: boolean
    onClick: () => void
}

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<TButtonProps>>(
    ({ className, isActive = false, size = 'm', hasBorder = true, onClick, children }, ref) => {
        return (
            <button
                ref={ref}
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
    },
)
