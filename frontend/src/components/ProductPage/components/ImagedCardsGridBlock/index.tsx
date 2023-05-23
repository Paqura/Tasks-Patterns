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
    sectionId: string
}> = ({ data, sectionId }) => {
    return (
        <PageSectionCard mode={'light'} sectionId={sectionId}>
            <PageSectionCardHeader title={data.title} description={data.description} />
            <CardsSlider scrollAreaClassName={styles.cardsListScrollArea}>
                <ul className={styles.cardsList}>
                    {data.items.map((task) => (
                        <li key={task.title} className={styles.cardsListItem}>
                            <ImagedCard data={task} />
                        </li>
                    ))}
                </ul>
            </CardsSlider>
        </PageSectionCard>
    )
}
