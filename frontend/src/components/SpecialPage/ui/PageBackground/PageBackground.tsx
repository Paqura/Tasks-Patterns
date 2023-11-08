import Image from 'next/image'

import { TImage, TVideo } from '@/types'

import styles from './index.module.scss'

type TPageBackgroundProps = {
    backgroundVideo: TNullable<TVideo>
    backgroundImage: TNullable<TImage>
}

export const PageBackground = ({ backgroundImage, backgroundVideo }: TPageBackgroundProps) => {
    return (
        <>
            {backgroundVideo?.src && (
                <video muted loop autoPlay playsInline preload="metadata" className={styles.video}>
                    <source src={backgroundVideo.src} />
                </video>
            )}

            {backgroundImage?.src && (
                <Image
                    src={backgroundImage.src}
                    width={backgroundImage.width}
                    height={backgroundImage.height}
                    className={styles.image}
                    alt=""
                />
            )}
        </>
    )
}
