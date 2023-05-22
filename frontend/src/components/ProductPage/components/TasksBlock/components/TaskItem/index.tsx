import Image from 'next/image'
import React from 'react'

import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'

type TProps = {
    title: string
    description?: string
    image: TImage
}

export const TaskItem: React.FC<TProps> = ({ title, description, image }) => {
    return (
        <div className={styles.task}>
            <Image className={styles.image} src={image.src} alt={image.alt || ''} />
            <div className={styles.textContent}>
                <Heading level={3}>{title}</Heading>
                <Text className={styles.description} type="pM">
                    {description}
                </Text>
            </div>
        </div>
    )
}
