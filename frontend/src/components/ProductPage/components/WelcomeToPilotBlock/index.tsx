import Image from 'next/image'
import React from 'react'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { TypographyTheme } from '@/components/ui/typography/TypographyTheme'
import { TImage } from '@/types'
import { CONTACTS_SECTION_ID } from '@/utils/constants'

import styles from './index.module.scss'

type TProps = {
    data: TWelcomeToPilotBlockData
}

export type TWelcomeToPilotBlockData = {
    title: string
    description: string
    buttonText: string
    image: TImage | null
}

export const WelcomeToPilotBlock: React.FC<TProps> = ({ data }) => {
    return (
        <TypographyTheme theme="light">
            <div className={styles.banner}>
                <div className={styles.content}>
                    {data.image && (
                        <Image
                            className={styles.image}
                            src={data.image.src}
                            width={data.image.width}
                            height={data.image.height}
                            alt={data.image.alt || ''}
                        />
                    )}
                    <div className={styles.textContent}>
                        <Heading level={2}>{data.title}</Heading>
                        <Text className={styles.description} type="pL">
                            {data.description}
                        </Text>
                        <Button className={styles.button} size="m" link={`#${CONTACTS_SECTION_ID}`}>
                            {data.buttonText}
                        </Button>
                    </div>
                </div>
            </div>
        </TypographyTheme>
    )
}
