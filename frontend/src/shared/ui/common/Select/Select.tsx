import { Listbox } from '@headlessui/react'
import cn from 'classnames'
import { ReactNode } from 'react'
import { useController } from 'react-hook-form'

import { useTranslate } from '@/services/translation'
import { validateRequired } from '@/shared/lib/validation/validateRequired'
import { InputError } from '@/shared/ui/common/InputError'

import styles from './index.module.scss'

type TSelectClasses = TClasses<
    | 'root'
    | 'select'
    | 'trigger'
    | 'triggerLabel'
    | 'arrowIcon'
    | 'option'
    | 'optionLabel'
    | 'optionCheckIcon'
>

type TSelectProps<TValueType> = {
    placeholder?: string
    name: string
    required?: boolean
    classes?: TSelectClasses

    options: TSelectOption<TValueType>[]

    components?: Partial<{
        triggerIcon: ReactNode
        triggerLabel: (option?: TSelectOption<TValueType>) => ReactNode
        optionLabel: (option: TSelectOption<TValueType>) => ReactNode
        optionCheckIcon: ReactNode
    }>

    dataTestIds?: Partial<{
        toggle: string
    }>
}

export type TSelectOption<TValueType> = {
    value: TValueType
    label: string
}

export function Select<TValueType>({
    placeholder,
    name,
    classes,
    required,
    options,
    dataTestIds,
    components,
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

    const handleChange = (option: TSelectOption<TValueType>) => {
        controllerProps.onChange(option.value)
    }

    const selectedItem = options.find(({ value }) => value === selectedItemValue)
    const triggerLabel = selectedItem?.label || placeholder

    return (
        <div className={cn(styles.root, classes?.root)}>
            <div className={cn(styles.select, classes?.select)}>
                <Listbox value={controllerProps.value} onChange={handleChange}>
                    <Listbox.Button
                        data-testid={dataTestIds?.toggle}
                        className={(props) => {
                            return cn(
                                styles.trigger,
                                {
                                    [styles.trigger_filled]: Boolean(selectedItem),
                                    [styles.trigger_error]: Boolean(errorMessage),
                                    [styles.trigger_opened]: props.open,
                                },
                                classes?.trigger,
                            )
                        }}
                    >
                        <span className={cn(styles.triggerLabel, classes?.triggerLabel)}>
                            {components?.triggerLabel?.(selectedItem) ?? triggerLabel}
                        </span>

                        {components?.triggerIcon ?? (
                            <span className={cn(styles.arrowIcon, classes?.arrowIcon)} />
                        )}
                    </Listbox.Button>

                    <Listbox.Options className={styles.options}>
                        {options.map((option, index) => (
                            <Listbox.Option
                                key={index}
                                value={option}
                                data-testid={`product-select-${index}`}
                                className={({ active }) =>
                                    cn(
                                        styles.option,
                                        { [styles.option_active]: Boolean(active) },
                                        classes?.option,
                                    )
                                }
                            >
                                <>
                                    {components?.optionLabel?.(option) ?? (
                                        <span
                                            className={cn(styles.optionLabel, classes?.optionLabel)}
                                        >
                                            {option.label}
                                        </span>
                                    )}

                                    {option.value === controllerProps.value &&
                                        (components?.optionCheckIcon ?? (
                                            <span
                                                className={cn(
                                                    styles.optionCheckIcon,
                                                    classes?.optionCheckIcon,
                                                )}
                                            />
                                        ))}
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
