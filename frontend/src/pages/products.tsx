import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { AllProductsPage } from '@/components/AllProductsPage'
import { fetchHeader, fetchConfig, fetchAllProductsPage, fetchProducts } from '@/utils/adminApi'
import { mapAllProductsPageServerData } from '@/utils/serverDataMappers/allProducts'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapProductCardServerData } from '@/utils/serverDataMappers/product/product-card'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    allProductsPage?: GetAttributesValues<'api::all-products-page.all-products-page'>
    products?: GetAttributesValues<'api::product.product'>[]
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async () => {
    const [config, header, allProductsPage, products] = await Promise.all([
        fetchConfig(),
        fetchHeader(),
        fetchAllProductsPage(),
        fetchProducts(),
    ])

    return {
        props: {
            config,
            header,
            allProductsPage,
            products,
        },
    }
}

type TProps = TServerSideProps

export default function Products(props: TProps) {
    const { headingSectionData } = mapAllProductsPageServerData(props.allProductsPage)

    const products = props.products?.map(mapProductCardServerData) || []

    return (
        <AllProductsPage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            headingSectionData={headingSectionData}
            products={products}
        />
    )
}
