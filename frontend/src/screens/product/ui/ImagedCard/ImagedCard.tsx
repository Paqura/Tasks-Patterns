import cn from 'classnames'
import Image from 'next/image'

import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { useTypographyTheme } from '@/shared/ui/common/typography/TypographyTheme'
import { TImage } from '@/types'

import styles from './index.module.scss'

export type TImagedCard = { title: string; description?: string; image: TImage }

type TImagedCardProps = {
    data: TImagedCard
}

export const ImagedCard = ({ data }: TImagedCardProps) => {
    const { title, description, image } = data

    const theme = useTypographyTheme()

    return (
        <div className={cn(styles.task, styles[`theme_${theme}`])}>
            <Image
                className={styles.image}
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt || ''}
            />

            <div className={styles.textContent}>
                <Heading level={3}>{title}</Heading>

                <Text className={styles.description} type="pM">
                    {description}
                </Text>
            </div>
        </div>
    )
}
