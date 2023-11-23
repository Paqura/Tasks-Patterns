import { CardsSlider } from '@/shared/ui/common/CardsSlider'
import { TypographyTheme } from '@/shared/ui/common/typography/TypographyTheme'
import { HeadingSection, THeadingSectionData } from '@/shared/ui/project/HeadingSection'
import { PageLayout, TSeo } from '@/shared/ui/project/PageLayout'
import { PageSection } from '@/shared/ui/project/PageSection'
import { ProductCard, TProductCard } from '@/shared/ui/project/ProductCard'
import { AnyQuestions, TAnyQuestionsData } from '@/widgets/AnyQuestions'
import { TFooterData } from '@/widgets/Footer'
import { THeaderData } from '@/widgets/Header'

import styles from './index.module.scss'

export type TProductsScreenData = {
    seo: TSeo
    headerData: THeaderData
    footerData: TFooterData
    headingSectionData: THeadingSectionData
    products: TProductCard[]
    anyQuestions: TAnyQuestionsData
}

export type TProductsScreenProps = TProductsScreenData

export const ProductsScreen: React.FC<TProductsScreenProps> = (props) => {
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
