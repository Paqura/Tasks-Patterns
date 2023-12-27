import { GetServerSideProps } from 'next'

import { ProductsScreen, TProductsScreenProps, productsMapper } from '@/screens/products'
import { getApi } from '@/services/strapi/api'
import { anyQuestionMapper } from '@/widgets/AnyQuestions'
import { footerMapper } from '@/widgets/Footer'
import { headerMapper } from '@/widgets/Header'

export type TServerSideProps = TProductsScreenProps

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async (params) => {
    const api = getApi(params.locale)

    const [config, header, allProductsPage, products = [], anyQuestions, footer] =
        await Promise.all([
            api.fetchConfig(),
            api.fetchHeader(),
            api.fetchAllProductsPage(),
            api.fetchProducts(),
            api.fetchAnyQuestions(),
            api.fetchFooter(),
        ])

    const { headingSectionData } = productsMapper.heading(allProductsPage)

    const productsData = productsMapper.toDomain(products)
    const anyQuestionsData = anyQuestionMapper.toDomain(anyQuestions, products)
    const footerData = footerMapper.toDomain(footer, products)
    const headerData = headerMapper.toDomain(header)

    return {
        props: {
            seo: config?.seo || {},
            headingSectionData,
            products: productsData,
            anyQuestions: anyQuestionsData,
            footerData,
            headerData,
        },
    }
}

type TProps = TServerSideProps

export default function Products(props: TProps) {
    return (
        <ProductsScreen
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            headingSectionData={props.headingSectionData}
            products={props.products}
            anyQuestions={props.anyQuestions}
        />
    )
}
