import Image from 'next/image'

import { Button } from '@/shared/ui/common/Button'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { TypographyTheme } from '@/shared/ui/common/typography/TypographyTheme'
import { TImage } from '@/types'

import styles from './index.module.scss'

export type TWelcomeToPilotBlockData = {
    title: string
    description: string
    button: { text: string; link: string; targetBlank: boolean } | null
    image: TImage | null
}

type TWelcomeToPilotBlockProps = {
    data: TWelcomeToPilotBlockData
}

export const WelcomeToPilotBlock = ({ data }: TWelcomeToPilotBlockProps) => {
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

                        {data.button && (
                            <Button
                                className={styles.button}
                                size="m"
                                link={data.button.link}
                                isTargetBlank={data.button.targetBlank}
                            >
                                {data.button.text}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </TypographyTheme>
    )
}
