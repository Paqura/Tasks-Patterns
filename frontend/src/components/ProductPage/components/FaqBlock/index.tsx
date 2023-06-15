import React from 'react'

import { LoadMore } from '@/components/ui/LoadMore'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'

import { FaqItemCard, TFaqItem } from './components/FaqItemCard'
import styles from './index.module.scss'

export type TFaqBlockData = {
    title: string
    description?: string
    items: TFaqItem[]
}

export const FaqBlock: React.FC<{
    data: TFaqBlockData
    sectionId: string
    number: number
}> = ({ data, sectionId, number }) => {
    return (
        <PageSectionCard mode={'light'} sectionId={sectionId}>
            <PageSectionCardHeader
                number={number}
                title={data.title}
                description={data.description}
            />
            <LoadMore
                className={styles.cardsListWrapper}
                cuttedClassName={styles.cardsListWrapper_cutted}
            >
                <ul className={styles.cardsList}>
                    {data.items.map((item, index) => (
                        <li key={index} className={styles.cardsListItem}>
                            <FaqItemCard data={item} />
                        </li>
                    ))}
                    {data.items.map((item, index) => (
                        <li key={index} className={styles.cardsListItem}>
                            <FaqItemCard data={item} />
                        </li>
                    ))}
                </ul>
            </LoadMore>
        </PageSectionCard>
    )
}
