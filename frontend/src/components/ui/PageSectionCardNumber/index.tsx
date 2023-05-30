import cn from 'classnames'
import React from 'react'

import { Heading } from '@/components/ui/typography/Heading'

import styles from './index.module.scss'

export const PageSectionCardNumber: React.FC<{
    className?: string
    number: number
}> = ({ number, className }) => {
    return (
        <Heading level={2} className={cn(styles.number, className)}>
            {number.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
            })}
        </Heading>
    )
}
