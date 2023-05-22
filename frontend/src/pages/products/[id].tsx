import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { ProductPage, TProductPageData } from '@/components/ProductPage'
import { TProductData } from '@/components/ProductPage/types'
import { fetchConfig, fetchHeader, fetchProduct } from '@/utils/adminApi'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapProductServerData } from '@/utils/serverDataMappers/product'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    product: GetAttributesValues<'api::product.product'>
}

export const getServerSideProps: GetServerSideProps<TServerSideProps, { id: string }> = async ({
    params,
}) => {
    if (!params?.id) {
        return {
            notFound: true,
        }
    }

    const [config, header, product] = await Promise.all([
        fetchConfig(),
        fetchHeader(),
        fetchProduct(params?.id),
    ])

    if (!product) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            config,
            header,
            product,
        },
    }
}

type TProps = TServerSideProps

export default function Product(props: TProps) {
    const headerData: TProductPageData['header'] = mapHeaderServerData(props.header)

    const product: TProductData = mapProductServerData(props.product)

    return <ProductPage seo={props.config?.seo || {}} header={headerData} product={product} />
}
