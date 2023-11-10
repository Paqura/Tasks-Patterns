import { CardsSlider } from '@/shared/ui/common/CardsSlider'
import { Link } from '@/shared/ui/common/Link'
import { PageSection } from '@/shared/ui/project/PageSection'
import { ProductCard, TProductCard } from '@/shared/ui/project/ProductCard'
import { TWithSectionParams } from '@/types'

import styles from './index.module.scss'
import { Clients, TClientsData } from './ui/Clients'

export type TProductsBlockData = TWithSectionParams<{
    allProductsLinkText: string
    products: TProductCard[]
    clients?: TClientsData
}>

type TProductsProps = {
    number: number
    data: TProductsBlockData
}

export const Products = ({ data, number }: TProductsProps) => {
    const { sectionId, title, description, allProductsLinkText, products, clients } = data

    return (
        <PageSection.Card mode="dark" sectionId={sectionId}>
            <PageSection.Header title={title} description={description} number={number} />
            <CardsSlider
                className={styles.productsList}
                scrollAreaClassName={styles.productsScrollArea}
                controls={
                    <Link type="s" href={'/products'}>
                        {allProductsLinkText}
                    </Link>
                }
            >
                {products.map((product, index) => (
                    <ProductCard key={index} data={product} />
                ))}
            </CardsSlider>
            {clients && (
                <div className={styles.clients}>
                    <Clients data={clients} />
                </div>
            )}
        </PageSection.Card>
    )
}
