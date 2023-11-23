import Image from 'next/image'

import { TImage, TVideo } from '@/types'

import styles from './index.module.scss'

export type TSectionBackground = {
    image: TNullable<TImage>
    video: TNullable<TVideo>
}

type TSectionBackgroundProps = {
    data: TSectionBackground
}

export const SectionBackground = ({ data }: TSectionBackgroundProps) => {
    const { video, image } = data

    return (
        <>
            {video?.src && (
                <video muted loop autoPlay playsInline preload="metadata" className={styles.video}>
                    <source src={video.src} />
                </video>
            )}

            {image && (
                <Image
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    className={styles.image}
                    unoptimized
                    alt=""
                />
            )}
        </>
    )
}
