import cn from 'classnames'
import Image from 'next/image'

import { Text } from '@/components/ui/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'

export type TSlide = { image: TImage; caption?: string }

type TSlideProps = {
    active: boolean
    prev: boolean
    next: boolean

    data: TSlide

    onSlideNext: VoidFunction | undefined
    onSlidePrev: VoidFunction | undefined
}

export const Slide = ({ active, next, prev, data, onSlideNext, onSlidePrev }: TSlideProps) => {
    const { image, caption } = data

    const handleImageClick = () => {
        const action = next ? onSlideNext : onSlidePrev

        action?.()
    }

    return (
        <div
            className={cn(styles.slideWrapper, {
                [styles.slideWrapper_active]: active,
                [styles.slideWrapper_prev]: prev,
                [styles.slideWrapper_next]: next,
            })}
        >
            <div className={styles.imageWrapper}>
                <Image
                    className={styles.image}
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={image.alt || ''}
                    unoptimized
                    onClick={handleImageClick}
                />
            </div>

            {caption && (
                <Text type="postscript" className={styles.caption}>
                    {caption}
                </Text>
            )}
        </div>
    )
}
