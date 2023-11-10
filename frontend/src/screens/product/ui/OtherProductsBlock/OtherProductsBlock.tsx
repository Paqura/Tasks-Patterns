import { useTranslate } from '@/shared/lib/translate'
import { CardsSlider } from '@/shared/ui/common/CardsSlider'
import { Link } from '@/shared/ui/common/Link'
import { PageSection } from '@/shared/ui/project/PageSection'
import { ProductCard, TProductCard } from '@/shared/ui/project/ProductCard'

import styles from './index.module.scss'

export type TOtherProductsBlockData = {
    title: string
    description?: string
    items: TProductCard[]
}

type TOtherProductsBlockProps = {
    number: number
    sectionId: string
    data: TOtherProductsBlockData
}

export const OtherProductsBlock = ({ data, sectionId, number }: TOtherProductsBlockProps) => {
    const { items, title, description } = data
    const translate = useTranslate()

    return (
        <PageSection.Card mode="dark" sectionId={sectionId}>
            <PageSection.Header title={title} description={description} number={number} />

            <CardsSlider
                className={styles.productsList}
                scrollAreaClassName={styles.productsScrollArea}
                controls={
                    <Link type="s" href={'/products'}>
                        {translate('product.viewAllProductsBtn')}
                    </Link>
                }
            >
                {items.map((product, index) => (
                    <ProductCard key={index} data={product} />
                ))}
            </CardsSlider>
        </PageSection.Card>
    )
}
