import { GetServerSideProps } from 'next'

import { ProductsScreen, TProductsScreenProps } from '@/screens/products'
import { getApi } from '@/services/strapi/api'
import { mapAllProductsPageServerData } from '@/shared/lib/serverDataMappers/allProducts'
import { mapAnyQuestionsServerData } from '@/shared/lib/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/shared/lib/serverDataMappers/footer'
import { mapHeaderServerData } from '@/shared/lib/serverDataMappers/header'
import { mapProductCardServerData } from '@/shared/lib/serverDataMappers/product/product-card'

export type TServerSideProps = TProductsScreenProps

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async (params) => {
    const api = getApi(params.locale)

    const [config, header, allProductsPage, products, anyQuestions, footer] = await Promise.all([
        api.fetchConfig(),
        api.fetchHeader(),
        api.fetchAllProductsPage(),
        api.fetchProducts(),
        api.fetchAnyQuestions(),
        api.fetchFooter(),
    ])

    const { headingSectionData } = mapAllProductsPageServerData(allProductsPage)

    const productsData = products?.map(mapProductCardServerData) || []
    const anyQuestionsData = mapAnyQuestionsServerData(anyQuestions, products)
    const footerData = mapFooterServerData(footer, products)
    const headerData = mapHeaderServerData(header)

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
