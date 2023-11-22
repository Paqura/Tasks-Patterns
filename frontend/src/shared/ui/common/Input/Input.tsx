import cn from 'classnames'
import { FormEvent, useMemo, useState } from 'react'
import { useController } from 'react-hook-form'
import { ValidationValueMessage } from 'react-hook-form/dist/types/validator'

import { TTranslateFn, useTranslate } from '@/services/translation'
import { validateEmail } from '@/shared/lib/validation/validateEmail'
import { validatePhoneNumber } from '@/shared/lib/validation/validatePhoneNumber'
import { validateRequired } from '@/shared/lib/validation/validateRequired'
import { InputError } from '@/shared/ui/common/InputError'

import styles from './index.module.scss'

type TInputType = 'text' | 'email' | 'tel'

type TInputProps = {
    type: TInputType
    placeholder?: string
    name: string
    pattern?: RegExp | ValidationValueMessage<RegExp>
    required?: boolean
    autoComplete?: string
    autofocus?: boolean
    className?: string
    maxLength?: number
}

const createValidators = (
    t: TTranslateFn,
): { [key in TInputType]: ValidationValueMessage<RegExp> | null } => ({
    text: null,
    email: validateEmail(t),
    tel: validatePhoneNumber(t),
})

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
}: TInputProps) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const fieldName = `${name}`
    const translate = useTranslate()
    const validators = useMemo(() => createValidators(translate), [translate])

    const controller = useController({
        defaultValue: '',
        name: fieldName,
        rules: {
            required: validateRequired(translate)(required),
            pattern: pattern || validators[type] || undefined,
        },
        shouldUnregister: true,
    })

    const controllerProps = controller.field

    const handleBlur = (event: FormEvent<HTMLInputElement>) => {
        setIsFocused(false)
        controllerProps.onChange(event.currentTarget.value.trim())

        controllerProps.onBlur()
    }

    const handleFocus = () => {
        setIsFocused(true)
    }

    const errorMessage = useMemo(() => {
        const error = controller.fieldState.error

        if (!error || isFocused) {
            return
        }

        const defaultMessage = 'Incorrect value'

        return error.message || defaultMessage
    }, [controller.fieldState.error, isFocused])

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
                maxLength={maxLength}
                onFocus={handleFocus}
                {...controllerProps}
                onBlur={handleBlur}
            />
            {errorMessage && <InputError>{errorMessage}</InputError>}
        </label>
    )
}
