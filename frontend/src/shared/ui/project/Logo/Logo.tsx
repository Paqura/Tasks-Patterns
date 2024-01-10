import Image from 'next/image'
import NextLink from 'next/link'
import React from 'react'

import { TImage } from '@/types'

import styles from './index.module.scss'

type TLogo = {
    href?: string
    image: TImage
}

export const Logo = ({ href, image }: TLogo) => {
    const imageElement = (
        <Image className={styles.image} fill src={image.src} alt={image.alt ?? ''} />
    )

    if (href)
        return (
            <NextLink href="/" className={styles.logo}>
                {imageElement}
            </NextLink>
        )

    return <div className={styles.logo}>{imageElement}</div>
}
