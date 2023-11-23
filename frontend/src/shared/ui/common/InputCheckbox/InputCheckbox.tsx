import cn from 'classnames'
import { useController } from 'react-hook-form'

import { useTranslate } from '@/services/translation'
import { validateRequired } from '@/shared/lib/validation/validateRequired'
import { Text } from '@/shared/ui/common/typography/Text'

import styles from './index.module.scss'

type TInputCheckboxProps = {
    required?: boolean
    title: string
    name: string
}

export const InputCheckbox = ({ required, title, name }: TInputCheckboxProps) => {
    const fieldName = `${name}`

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
