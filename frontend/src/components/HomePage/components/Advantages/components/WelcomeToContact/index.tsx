import React from 'react'

import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

export const WelcomeToContact: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <Heading level={2} className={styles.title}>
                Ready to&nbsp;secure your business?&nbsp;
                <span className={styles.accentText}>Get in&nbsp;touch</span>
            </Heading>
            <Text type="pM" className={styles.description}>
                Contact&nbsp;us today to&nbsp;learn how our cybersecurity solutions can help protect
                your organization from threats and vulnerabilities. Don&rsquo;t wait until
                it&rsquo;s too late&nbsp;&mdash; take action now to&nbsp;ensure the safety and
                integrity of&nbsp;your data.
            </Text>
            <div className={styles.background} />
        </div>
    )
}
