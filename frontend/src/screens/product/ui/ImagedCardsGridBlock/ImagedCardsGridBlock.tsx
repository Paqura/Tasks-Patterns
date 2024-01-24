import { ImagedCard, TImagedCard } from '@/screens/product/ui/ImagedCard'
import { CardsSlider } from '@/shared/ui/common/CardsSlider'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'

export type TImagedCardsGridBlockData = {
    title: string
    description?: string
    items: TImagedCard[]
}

type TImagedCardsGridBlockProps = {
    data: TImagedCardsGridBlockData
    number: number
    sectionId: string
}

export const ImagedCardsGridBlock = ({ data, sectionId, number }: TImagedCardsGridBlockProps) => {
    return (
        <PageSection.Card mode={'light'} sectionId={sectionId}>
            <PageSection.Header number={number} title={data.title} description={data.description} />

            <CardsSlider classes={{ scrollArea: styles.cardsListScrollArea }}>
                <ul className={styles.cardsList}>
                    {data.items.map((item) => (
                        <li key={item.title} className={styles.cardsListItem}>
                            <ImagedCard data={item} />
                        </li>
                    ))}
                </ul>
            </CardsSlider>
        </PageSection.Card>
    )
}
