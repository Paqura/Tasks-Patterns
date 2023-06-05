import { AnyQuestions, TAnyQuestionsData } from '@/components/AnyQuestions'
import { TFooterData } from '@/components/Footer'
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
    footerData: TFooterData
    headingSectionData: THeadingSectionData
    products: TProductCard[]
    anyQuestions: TAnyQuestionsData
}

type TAllProductsPageProps = TAllProductsPageData

export const AllProductsPage: React.FC<TAllProductsPageProps> = (props) => {
    return (
        <PageLayout seo={props.seo} headerData={props.headerData} footerData={props.footerData}>
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
            <AnyQuestions anyQuestionData={props.anyQuestions} />
        </PageLayout>
    )
}
