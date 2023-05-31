import Image from 'next/image'
import React from 'react'

import { TImage } from '@/types'

import styles from './index.module.scss'

import HeaderArticle from 'src/components/HeaderArticle'
export default function NewsArticleHeader(props: { image: TImage; title: string; topic: string }) {
    return (
        <div className={styles.banner}>
            {props.image && (
                <Image
                    className={styles.imageBg}
                    src={props.image.src}
                    width={props.image.width}
                    height={props.image.height}
                    alt={props.image.alt || ''}
                />
            )}
            <HeaderArticle title={props.title} topic={props.topic} />
        </div>
    )
}
