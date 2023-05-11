import cn from 'classnames'
import React from 'react'

import styles from './index.module.scss'

type TProps = {
    className?: string
    sectionId?: string
}

export const PageSection: React.FC<React.PropsWithChildren<TProps>> = ({
    children,
    className,
    sectionId,
}) => {
    return (
        <section className={cn(styles.section, className)} id={sectionId}>
            {children}
        </section>
    )
}
