import cn from 'classnames'
import React, { useMemo } from 'react'
import { useController } from 'react-hook-form'
import { ValidationValueMessage } from 'react-hook-form/dist/types/validator'

import { InputError } from '@/components/ui/InputError'
import { validateEmail } from '@/utils/validation/validateEmail'
import { validatePhoneNumber } from '@/utils/validation/validatePhoneNumber'
import { validateRequired } from '@/utils/validation/validateRequired'

import styles from './index.module.scss'

type TInputType = 'text' | 'email' | 'tel'
type TAutoCompleteType = 'on' | 'off'

interface IProps {
    type: TInputType
    placeholder?: string
    name: string
    pattern?: RegExp | ValidationValueMessage<RegExp>
    required?: boolean
    autoComplete?: TAutoCompleteType
    autofocus?: boolean
    className?: string
    maxLength?: number
}

const validators: { [key in TInputType]: ValidationValueMessage<RegExp> | null } = {
    text: null,
    email: validateEmail,
    tel: validatePhoneNumber,
}

export const Input = ({
    type,
    placeholder,
    name,
    className,
    autofocus,
    pattern,
    autoComplete = 'off',
    required,
    maxLength,
}: IProps) => {
    const fieldName = `${name}` as const
    const controller = useController({
        name: fieldName,
        rules: {
            required: validateRequired(required),
            pattern: pattern || validators[type] || undefined,
        },
        shouldUnregister: true,
    })
    const controllerProps = controller.field

    const handleBlur = (event: React.FormEvent<HTMLInputElement>) => {
        controllerProps.onChange(event.currentTarget.value.trim())
        controllerProps.onBlur()
    }

    const errorMessage = useMemo(() => {
        const error = controller.fieldState.error

        if (!error) {
            return
        }

        const defaultMessage = 'Incorrect value'

        return error.message || defaultMessage
    }, [controller.fieldState.error])

    return (
        <label className={styles.container}>
            <input
                className={cn(styles.input, className, {
                    [styles.input_error]: Boolean(errorMessage),
                    [styles.input_filled]: Boolean(controllerProps.value),
                })}
                placeholder={placeholder}
                type={'text'}
                autoFocus={autofocus}
                autoComplete={autoComplete}
                defaultValue={''}
                maxLength={maxLength}
                {...controllerProps}
                onBlur={handleBlur}
                value={controllerProps.value || ''}
            />
            {errorMessage && <InputError>{errorMessage}</InputError>}
        </label>
    )
}
