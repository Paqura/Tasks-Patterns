import { useTranslate } from '@/shared/lib/translate'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'
import { FaqItemCard, TFaqItem } from './ui/FaqItemCard'
import { LoadMore } from './ui/LoadMore'

export type TFaqBlockData = {
    title: string
    description?: string
    items: TFaqItem[]
}

type TFaqBlockProps = {
    data: TFaqBlockData
    sectionId: string
    number: number
}

export const FaqBlock = ({ data, sectionId, number }: TFaqBlockProps) => {
    const translate = useTranslate()
    return (
        <PageSection.Card mode={'light'} sectionId={sectionId}>
            <PageSection.Header number={number} title={data.title} description={data.description} />

            <LoadMore
                btnText={translate('product.faqLoadMoreBtn')}
                classes={{
                    root: styles.cardsListWrapper,
                    cutOuter: styles.cardsListWrapper_cutted,
                }}
            >
                <ul className={styles.cardsList}>
                    {data.items.map((item, index) => (
                        <li key={index} className={styles.cardsListItem}>
                            <FaqItemCard data={item} />
                        </li>
                    ))}
                </ul>
            </LoadMore>
        </PageSection.Card>
    )
}
