import cn from 'classnames'
import React from 'react'

import styles from './index.module.scss'

type TWithClassName = { className?: string }

export const ArticleLayoutGrid: React.FC<React.PropsWithChildren<TWithClassName>> = ({
    children,
    className,
}) => {
    return <div className={cn(styles.grid, className)}>{children}</div>
}

export const ArticleLayoutGridLeftColumn: React.FC<React.PropsWithChildren<TWithClassName>> = ({
    children,
    className,
}) => {
    return <div className={cn(styles.leftColumn, className)}>{children}</div>
}

export const ArticleLayoutGridRightColumn: React.FC<React.PropsWithChildren<TWithClassName>> = ({
    children,
    className,
}) => {
    return <div className={cn(styles.rightColumn, className)}>{children}</div>
}
