import Image from 'next/image'
import React from 'react'

import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

type TProps = {
    logo: string
    name: string
}

export const ClientCard: React.FC<TProps> = ({ name, logo }) => {
    return (
        <div className={styles.card}>
            <Text type="postscript">{name}</Text>
            <div className={styles.logo}>
                <Image src={logo} alt="" />
            </div>
        </div>
    )
}
