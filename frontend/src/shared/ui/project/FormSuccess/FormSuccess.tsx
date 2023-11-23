import cn from 'classnames'

import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'

import styles from './index.module.scss'

type TFormSuccessProps = {
    title?: string
    description?: string
    className?: string
}

export const FormSuccess = ({ title, description, className }: TFormSuccessProps) => {
    return (
        <div className={cn(className, styles.wrapper)}>
            <Heading level={3} className={styles.title}>
                {title}
            </Heading>

            <Text type={'pL'}>{description}</Text>
        </div>
    )
}
