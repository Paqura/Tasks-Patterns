import React from 'react'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { CONTACTS_SECTION_ID } from '@/utils/constants'
import { sanitizeText } from '@/utils/sanitize'

import styles from './index.module.scss'

export type TWelcomeToContactData = {
    title: string
    accentText?: string
    description: string
    buttonText: string
}
export const WelcomeToContact: React.FC<{ data: TWelcomeToContactData }> = ({ data }) => {
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
