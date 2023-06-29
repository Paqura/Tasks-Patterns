import { GetServerSideProps } from 'next'

import { AllProductsPage, TAllProductsPageData } from '@/components/AllProductsPage'
import {
    fetchHeader,
    fetchConfig,
    fetchAllProductsPage,
    fetchProducts,
    fetchAnyQuestions,
    fetchFooter,
} from '@/utils/adminApi'
import { mapAllProductsPageServerData } from '@/utils/serverDataMappers/allProducts'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapProductCardServerData } from '@/utils/serverDataMappers/product/product-card'

export type TServerSideProps = TAllProductsPageData

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async () => {
    const [config, header, allProductsPage, products, anyQuestions, footer] = await Promise.all([
        fetchConfig(),
        fetchHeader(),
        fetchAllProductsPage(),
        fetchProducts(),
        fetchAnyQuestions(),
        fetchFooter(),
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
        <AllProductsPage
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            headingSectionData={props.headingSectionData}
            products={props.products}
            anyQuestions={props.anyQuestions}
        />
    )
}
