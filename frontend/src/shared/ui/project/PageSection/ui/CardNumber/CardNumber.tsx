import cn from 'classnames'

import { Heading } from '@/shared/ui/common/typography/Heading'

import styles from './index.module.scss'

type TCardNumberProps = {
    className?: string
    number: number
}

export const CardNumber = ({ number, className }: TCardNumberProps) => {
    return (
        <Heading level={2} className={cn(styles.number, className)}>
            {number.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
            })}
        </Heading>
    )
}
