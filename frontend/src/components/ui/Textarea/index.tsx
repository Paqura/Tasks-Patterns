import cn from 'classnames'
import React from 'react'
import { useController } from 'react-hook-form'

import { InputError } from '@/components/ui/InputError'
import { validateRequired } from '@/utils/validation/validateRequired'

import styles from './index.module.scss'

interface IProps {
    placeholder?: string
    name: string
    required?: boolean
    autoFocus?: boolean
    className?: string
}

export const Textarea = ({ placeholder, name, className, autoFocus, required }: IProps) => {
    const fieldName = `${name}` as const
    const controller = useController({
        name: fieldName,
        rules: {
            required: validateRequired(required),
        },
        shouldUnregister: true,
    })
    const controllerProps = controller.field

    const errorMessage = controller.fieldState.error?.message

    return (
        <label className={styles.container}>
            <textarea
                id={fieldName}
                className={cn(styles.input, className, { [styles.input_error]: !!errorMessage })}
                placeholder={placeholder}
                autoFocus={autoFocus}
                {...controllerProps}
                value={controllerProps.value || ''}
            />

            {errorMessage && <InputError>{errorMessage}</InputError>}
        </label>
    )
}
