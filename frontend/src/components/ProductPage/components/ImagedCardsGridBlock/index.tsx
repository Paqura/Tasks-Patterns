import React from 'react'

import { ImagedCard, TImagedCard } from '@/components/ProductPage/components/ImagedCard'
import { CardsSlider } from '@/components/ui/CardsSlider'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'

import styles from './index.module.scss'

export type TImagedCardsGridBlockData = {
    title: string
    description?: string
    items: TImagedCard[]
}

export const ImagedCardsGridBlock: React.FC<{
    data: TImagedCardsGridBlockData
    number: number
    sectionId: string
}> = ({ data, sectionId, number }) => {
    return (
        <PageSectionCard mode={'light'} sectionId={sectionId}>
            <PageSectionCardHeader
                number={number}
                title={data.title}
                description={data.description}
            />
            <CardsSlider scrollAreaClassName={styles.cardsListScrollArea}>
                <ul className={styles.cardsList}>
                    {data.items.map((item) => (
                        <li key={item.title} className={styles.cardsListItem}>
                            <ImagedCard data={item} />
                        </li>
                    ))}
                </ul>
            </CardsSlider>
        </PageSectionCard>
    )
}
