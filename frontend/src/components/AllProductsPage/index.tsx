import { THeaderData } from '@/components/Header'
import { HeadingSection, THeadingSectionData } from '@/components/HeadingSection'
import { PageLayout, TSeo } from '@/components/PageLayout'
import { ProductCard, TProductCard } from '@/components/ProductCard'
import { CardsSlider } from '@/components/ui/CardsSlider'
import { PageSection } from '@/components/ui/PageSection'
import { TypographyTheme } from '@/components/ui/typography/TypographyTheme'

import styles from './inde.module.scss'

export type TAllProductsPageData = {
    seo: TSeo
    headerData: THeaderData
    headingSectionData: THeadingSectionData
    products: TProductCard[]
}

type TAllProductsPageProps = TAllProductsPageData

export const AllProductsPage: React.FC<TAllProductsPageProps> = (props) => {
    return (
        <PageLayout seo={props.seo} navItems={props.headerData.navItems}>
            <HeadingSection data={props.headingSectionData} />
            <PageSection>
                <TypographyTheme theme="dark">
                    <CardsSlider hideControls scrollAreaClassName={styles.cardsList}>
                        {props.products.map((product, key) => {
                            return (
                                <ProductCard
                                    className={styles.productCard}
                                    key={key}
                                    data={product}
                                />
                            )
                        })}
                    </CardsSlider>
                </TypographyTheme>
            </PageSection>
        </PageLayout>
    )
}
