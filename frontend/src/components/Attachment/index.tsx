import Link from 'next/link'
import React from 'react'

import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

type TProps = {
    title: string
    src: string
}

export const Attachment: React.FC<TProps> = ({ title, src }) => {
    return (
        <Link href={src} className={styles.attachment} target="_blank" download={true}>
            <Text type="pM" className={styles.name}>
                {title}
            </Text>
        </Link>
    )
}
