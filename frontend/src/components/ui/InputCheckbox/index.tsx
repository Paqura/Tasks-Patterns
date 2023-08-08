import cn from 'classnames'
import React from 'react'
import { useController } from 'react-hook-form'

import { Text } from '@/components/ui/typography/Text'
import { useTranslate } from '@/utils/translate'
import { validateRequired } from '@/utils/validation/validateRequired'

import styles from './index.module.scss'

type TProps = {
    required?: boolean
    title: string
    name: string
}
export const InputCheckbox: React.FC<TProps> = ({ required, title, name }) => {
    const fieldName = `${name}` as const
    const translate = useTranslate()
    const controller = useController({
        name: fieldName,
        rules: {
            required: validateRequired(translate)(Boolean(required)),
        },
    })

    const error = controller.fieldState.error?.message

    return (
        <label>
            <input className={styles.input} type="checkbox" id={name} {...controller.field} />
            <Text
                className={cn(styles.checkboxLabel, { [styles.error]: Boolean(error) })}
                type="pS"
            >
                {title}
            </Text>
        </label>
    )
}
