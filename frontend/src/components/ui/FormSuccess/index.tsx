import cn from 'classnames'
import React from 'react'

import styles from './index.module.scss'

import { Heading } from 'src/components/ui/typography/Heading'
import { Text } from 'src/components/ui/typography/Text'

interface IFormSuccess {
    title?: string
    description?: string
    className?: string
}
export default function FormSuccess({ title, description, className }: IFormSuccess) {
    return (
        <div className={cn(className, styles.wrapper)}>
            <Heading level={3} className={styles.title}>
                {title}
            </Heading>
            <Text type={'pL'}>{description}</Text>
        </div>
    )
}
