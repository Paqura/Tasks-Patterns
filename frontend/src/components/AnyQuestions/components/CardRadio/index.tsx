import cn from 'classnames'
import React from 'react'

import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

type TCardRadioProps = {
    title: string
    description: string
    value: string
    checked?: boolean
    name?: string
    onChange: () => void
}

export const CardRadio: React.FC<TCardRadioProps> = ({
    title,
    description,
    value,
    checked,
    name = 'type',
    onChange,
}) => {
    return (
        <label className={cn(styles.container, { [styles.checked]: checked })}>
            <input name={name} type={'radio'} value={value} checked={checked} onChange={onChange} />
            <Text className={styles.title} type={'postscript'}>
                {title}
            </Text>
            <Text className={styles.description} type={'pM'}>
                {description}
            </Text>
        </label>
    )
}
