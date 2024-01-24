import cn from 'classnames'
import React, { useState } from 'react'
import { useController } from 'react-hook-form'

import { useTranslate } from '@/services/translation'
import { validateRequired } from '@/shared/lib/validation/validateRequired'
import { InputError } from '@/shared/ui/common/InputError'

import styles from './index.module.scss'

type TTextareaProps = {
    placeholder?: string
    name: string
    required?: boolean
    autoFocus?: boolean
    classes?: TClasses<'root' | 'textarea'>
    maxLength?: number
}

export const Textarea = ({
    placeholder,
    name,
    classes,
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
        <label className={cn(styles.container, classes?.root)}>
            <textarea
                id={fieldName}
                className={cn(
                    styles.textarea,
                    {
                        [styles.textarea_error]: Boolean(errorMessage),
                        [styles.textarea_filled]: Boolean(controllerProps.value),
                    },
                    classes?.textarea,
                )}
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
