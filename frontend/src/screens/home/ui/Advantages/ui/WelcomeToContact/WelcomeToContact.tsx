import { CONTACTS_SECTION_ID } from '@/shared/lib/constants'
import { sanitizeText } from '@/shared/lib/sanitize'
import { Button } from '@/shared/ui/common/Button'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'

import styles from './index.module.scss'

export type TWelcomeToContactData = {
    title: string
    accentText?: string
    description: string
    buttonText: string
}

type TWelcomeToContactProps = {
    data: TWelcomeToContactData
}

export const WelcomeToContact = ({ data }: TWelcomeToContactProps) => {
    const { title, accentText, description, buttonText } = data

    return (
        <div className={styles.wrapper}>
            <Heading level={2} className={styles.title}>
                {title}{' '}
                {accentText && (
                    <span
                        className={styles.accentText}
                        dangerouslySetInnerHTML={{ __html: sanitizeText(accentText) }}
                    />
                )}
            </Heading>

            <Text type="pM" className={styles.description}>
                {description}
            </Text>

            <Button link={`#${CONTACTS_SECTION_ID}`}>{buttonText}</Button>
            <div className={styles.background} />
        </div>
    )
}
