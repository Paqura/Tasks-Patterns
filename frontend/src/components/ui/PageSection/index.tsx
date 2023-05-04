import cn from 'classnames'
import React from 'react'

import styles from './index.module.scss'

type TProps = {
    className?: string
}

export const PageSection: React.FC<React.PropsWithChildren<TProps>> = ({ children, className }) => {
    return <section className={cn(styles.section, className)}>{children}</section>
}
