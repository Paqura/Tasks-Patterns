import cn from 'classnames'

import { Text } from '@/shared/ui/common/typography/Text'

import styles from './index.module.scss'

type TCardRadioProps = {
    title: string
    description: string
    value: string
    checked?: boolean
    name?: string
    onChange: VoidFunction
}

export const CardRadio = ({
    title,
    description,
    value,
    checked,
    name = 'type',
    onChange,
}: TCardRadioProps) => {
    return (
        <label className={cn(styles.container, { [styles.checked]: checked })}>
            <input name={name} type={'radio'} value={value} checked={checked} onChange={onChange} />
            <Text className={styles.title} type={'postscript'}>
                {title}
            </Text>
            <Text className={styles.description} type={'pM'}>
                {description}
            </Text>
        </label>
    )
}
