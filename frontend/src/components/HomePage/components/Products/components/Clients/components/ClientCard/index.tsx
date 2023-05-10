import Image from 'next/image'
import React from 'react'

import { Text } from '@/components/ui/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'

type TProps = {
    logo: TImage
    name: string
}

export const ClientCard: React.FC<TProps> = ({ name, logo }) => {
    return (
        <div className={styles.card}>
            <Text type="postscript">{name}</Text>
            <div className={styles.logo}>
                <Image src={logo.src} alt="" width={logo.width} height={logo.height} />
            </div>
        </div>
    )
}
