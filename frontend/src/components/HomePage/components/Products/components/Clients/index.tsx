import React from 'react'

import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

const title = 'Our Clients'
const descriptionText =
    'Our technology and services are used by&nbsp;more than 2,300 organisations worldwide, including&nbsp;80% of&nbsp;the Expert 400.'

export const Clients: React.FC = () => {
    return (
        <div className={styles.clients}>
            <div className={styles.textContent}>
                <Heading level={2} className={styles.title}>
                    {title}
                </Heading>
                <Text type="pM" className={styles.description}>
                    {descriptionText}
                </Text>
            </div>
            <div className={styles.list}></div>
        </div>
    )
}
