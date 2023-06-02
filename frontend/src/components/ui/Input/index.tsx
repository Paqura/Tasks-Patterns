import cn from 'classnames'
import React, { useMemo } from 'react'
import { useController } from 'react-hook-form'
import { ValidationValueMessage } from 'react-hook-form/dist/types/validator'
import MaskedInput, { Mask } from 'react-text-mask'

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
}

const validators: { [key in TInputType]: ValidationValueMessage<RegExp> | null } = {
    text: null,
    email: validateEmail,
    tel: validatePhoneNumber,
}

const PHONE_MASK: Mask = [
    '+',
    '7',
    ' ',
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
]

export const Input = ({
    type,
    placeholder,
    name,
    className,
    autofocus,
    pattern,
    autoComplete = 'off',
    required,
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

    const errorMessage = useMemo(() => {
        const error = controller.fieldState.error

        if (!error) {
            return
        }

        const defaultMessage = 'Incorrect value'

        return error.message || defaultMessage
    }, [controller.fieldState.error])

    const renderInput = () => (
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
            {...controllerProps}
            value={controllerProps.value || ''}
        />
    )

    const renderTelInput = () => (
        <MaskedInput
            id={name}
            className={cn(styles.input, className, {
                [styles.input_error]: Boolean(errorMessage),
                [styles.input_filled]: Boolean(controllerProps.value),
            })}
            mask={PHONE_MASK}
            guide={true}
            type={'tel'}
            autoComplete={autoComplete}
            autoFocus={autofocus}
            inputMode={'tel'}
            placeholder={placeholder || ''}
            {...controllerProps}
            value={controllerProps.value || ''}
            render={(ref, props) => {
                return (
                    <input
                        ref={(input) => ref(input as HTMLElement)}
                        {...props}
                        defaultValue={''}
                        value={controllerProps.value || ''}
                    />
                )
            }}
        />
    )

    return (
        <label className={styles.container}>
            {type === 'tel' ? renderTelInput() : renderInput()}

            {errorMessage && <InputError>{errorMessage}</InputError>}
        </label>
    )
}
