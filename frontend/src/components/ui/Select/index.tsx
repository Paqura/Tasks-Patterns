import { Listbox } from '@headlessui/react'
import cn from 'classnames'
import { useController } from 'react-hook-form'

import { InputError } from '@/components/ui/InputError'
import { useTranslate } from '@/utils/translate'
import { validateRequired } from '@/utils/validation/validateRequired'

import styles from './index.module.scss'

type TSelectProps<TValueType> = {
    placeholder?: string
    name: string
    required?: boolean
    className?: string
    options: TSelectOption<TValueType>[]
}

export type TSelectOption<TValueType> = {
    value: TValueType
    label: string
}

export function Select<TValueType>({
    placeholder,
    name,
    className,
    required,
    options,
}: TSelectProps<TValueType>) {
    const fieldName = `${name}` as const
    const translate = useTranslate()
    const controller = useController({
        name: fieldName,
        rules: {
            required: validateRequired(translate)(required),
        },
        shouldUnregister: true,
    })
    const controllerProps = controller.field

    const errorMessage = controller.fieldState.error?.message
    const selectedItemValue = controllerProps.value
    const selectedPerson = options.find((p) => p.value === selectedItemValue)

    const handleChange = (option: TSelectOption<TValueType>) => {
        controllerProps.onChange(option.value)
    }

    return (
        <div className={styles.container}>
            <div className={cn(styles.select, className)}>
                <Listbox value={controllerProps.value} onChange={handleChange}>
                    <Listbox.Button
                        className={(props) => {
                            return cn(styles.selectInput, {
                                [styles.selectInput_filled]: Boolean(selectedPerson),
                                [styles.selectInput_error]: Boolean(errorMessage),
                                [styles.selectInput_opened]: props.open,
                            })
                        }}
                    >
                        <span className={styles.inputContent}>
                            {selectedPerson?.label || placeholder}
                        </span>
                        <span className={styles.arrowIcon} />
                    </Listbox.Button>
                    <Listbox.Options className={styles.options}>
                        {options.map((option, index) => (
                            <Listbox.Option
                                key={index}
                                value={option}
                                className={({ active }) =>
                                    cn(styles.option, { [styles.option_active]: Boolean(active) })
                                }
                            >
                                <>
                                    <span className={styles.optionLabel}>{option.label}</span>
                                    {option.value === controllerProps.value ? (
                                        <span className={styles.optionCheckIcon} />
                                    ) : null}
                                </>
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Listbox>
            </div>

            {errorMessage && <InputError>{errorMessage}</InputError>}
        </div>
    )
}
