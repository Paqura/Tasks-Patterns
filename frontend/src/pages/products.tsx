import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { AllProductsPage } from '@/components/AllProductsPage'
import {
    fetchHeader,
    fetchConfig,
    fetchAllProductsPage,
    fetchProducts,
    fetchAnyQuestions,
} from '@/utils/adminApi'
import { mapAllProductsPageServerData } from '@/utils/serverDataMappers/allProducts'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapProductCardServerData } from '@/utils/serverDataMappers/product/product-card'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    allProductsPage?: GetAttributesValues<'api::all-products-page.all-products-page'>
    products?: GetAttributesValues<'api::product.product'>[]
    anyQuestions?: GetAttributesValues<'api::any-question.any-question'>
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async () => {
    const [config, header, allProductsPage, products, anyQuestions] = await Promise.all([
        fetchConfig(),
        fetchHeader(),
        fetchAllProductsPage(),
        fetchProducts(),
        fetchAnyQuestions(),
    ])

    return {
        props: {
            config,
            header,
            allProductsPage,
            products,
            anyQuestions,
        },
    }
}

type TProps = TServerSideProps

export default function Products(props: TProps) {
    const { headingSectionData } = mapAllProductsPageServerData(props.allProductsPage)

    const products = props.products?.map(mapProductCardServerData) || []
    const anyQuestions = mapAnyQuestionsServerData(props.anyQuestions, props.products)

    return (
        <AllProductsPage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            headingSectionData={headingSectionData}
            products={products}
            anyQuestions={anyQuestions}
        />
    )
}
