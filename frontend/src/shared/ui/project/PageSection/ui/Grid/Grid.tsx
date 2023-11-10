import cn from 'classnames'
import { PropsWithChildren } from 'react'

import styles from './index.module.scss'

type TWithClassName = { className?: string }

export const Grid = ({ children, className }: PropsWithChildren<TWithClassName>) => {
    return <div className={cn(styles.grid, className)}>{children}</div>
}

export const LeftColumn = ({ children, className }: PropsWithChildren<TWithClassName>) => {
    return <div className={cn(styles.leftColumn, className)}>{children}</div>
}

export const RightColumn = ({ children, className }: PropsWithChildren<TWithClassName>) => {
    return <div className={cn(styles.rightColumn, className)}>{children}</div>
}
