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
    maxLength?: number
}

export const Textarea = ({
    placeholder,
    name,
    className,
    autoFocus,
    required,
    maxLength,
}: IProps) => {
    const fieldName = `${name}` as const
    const controller = useController({
        name: fieldName,
        rules: {
            required: validateRequired(required),
        },
        shouldUnregister: true,
    })

    const handleBlur = (event: React.FormEvent<HTMLTextAreaElement>) => {
        controllerProps.onChange(event.currentTarget.value.trim())
        controllerProps.onBlur()
    }

    const controllerProps = controller.field

    const errorMessage = controller.fieldState.error?.message

    return (
        <label className={styles.container}>
            <textarea
                id={fieldName}
                className={cn(styles.textarea, className, {
                    [styles.textarea_error]: Boolean(errorMessage),
                    [styles.textarea_filled]: Boolean(controllerProps.value),
                })}
                placeholder={placeholder}
                autoFocus={autoFocus}
                maxLength={maxLength}
                {...controllerProps}
                onBlur={handleBlur}
                value={controllerProps.value || ''}
            />

            {errorMessage && <InputError>{errorMessage}</InputError>}
        </label>
    )
}
