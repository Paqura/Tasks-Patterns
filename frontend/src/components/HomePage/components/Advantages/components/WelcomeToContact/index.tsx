import React from 'react'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { CONTACTS_SECTION_ID } from '@/utils/constants'
import { sanitizeText } from '@/utils/sanitize'

import styles from './index.module.scss'

const title = 'Ready to&nbsp;secure your business?'
const accentText = 'Get&nbsp;in&nbsp;touch'
const descriptionText =
    'Contact&nbsp;us today to&nbsp;learn how our cybersecurity solutions can help protect your organization from threats and vulnerabilities. Don&rsquo;t wait until it&rsquo;s too late&nbsp;&mdash; take action now to&nbsp;ensure the safety and integrity of&nbsp;your data.'

export const WelcomeToContact: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <Heading level={2} className={styles.title}>
                {title}{' '}
                <span
                    className={styles.accentText}
                    dangerouslySetInnerHTML={{ __html: sanitizeText(accentText) }}
                />
            </Heading>
            <Text type="pM" className={styles.description}>
                {descriptionText}
            </Text>
            <Button link={`#${CONTACTS_SECTION_ID}`}>Contact us</Button>
            <div className={styles.background} />
        </div>
    )
}
