import cn from 'classnames'
import React, { useState } from 'react'
import { useController } from 'react-hook-form'

import { InputError } from '@/components/ui/InputError'
import { useTranslate } from '@/utils/translate'
import { validateRequired } from '@/utils/validation/validateRequired'

import styles from './index.module.scss'

type TTextareaProps = {
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
}: TTextareaProps) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const fieldName = `${name}` as const
    const translate = useTranslate()
    const controller = useController({
        name: fieldName,
        rules: {
            required: validateRequired(translate)(required),
        },
        shouldUnregister: true,
    })

    const handleBlur = (event: React.FormEvent<HTMLTextAreaElement>) => {
        setIsFocused(false)
        controllerProps.onChange(event.currentTarget.value.trim())
        controllerProps.onBlur()
    }

    const handleFocus = () => {
        setIsFocused(true)
    }

    const controllerProps = controller.field

    const errorMessage = isFocused ? null : controller.fieldState.error?.message

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
                onFocus={handleFocus}
                {...controllerProps}
                onBlur={handleBlur}
                value={controllerProps.value || ''}
            />

            {errorMessage && <InputError>{errorMessage}</InputError>}
        </label>
    )
}
