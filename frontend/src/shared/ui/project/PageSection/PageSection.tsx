import cn from 'classnames'
import { PropsWithChildren, forwardRef } from 'react'

import styles from './index.module.scss'
import { Card } from './ui/Card'
import { CardNumber } from './ui/CardNumber'
import { Grid, LeftColumn, RightColumn } from './ui/Grid'
import { Header } from './ui/Header'

export type TPageSectionProps = {
    className?: string
    sectionId?: string
}

const PageSectionRoot = forwardRef<HTMLDivElement, PropsWithChildren<TPageSectionProps>>(
    ({ children, className, sectionId }, ref) => {
        return (
            <section className={cn(styles.section, className)} id={sectionId} ref={ref}>
                {children}
            </section>
        )
    },
)

export const PageSection = Object.assign(PageSectionRoot, {
    Card,
    CardNumber,
    Grid,
    LeftColumn,
    RightColumn,
    Header,
})
