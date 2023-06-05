import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { ProductPage } from '@/components/ProductPage'
import { TProductData } from '@/components/ProductPage/types'
import {
    fetchAnyQuestions,
    fetchConfig,
    fetchHeader,
    fetchProduct,
    fetchProducts,
} from '@/utils/adminApi'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapProductServerData } from '@/utils/serverDataMappers/product'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    product: GetAttributesValues<'api::product.product'>
    anyQuestions?: GetAttributesValues<'api::any-question.any-question'>
    allProducts?: GetAttributesValues<'api::product.product'>[]
}

export const getServerSideProps: GetServerSideProps<TServerSideProps, { id: string }> = async ({
    params,
}) => {
    if (!params?.id) {
        return {
            notFound: true,
        }
    }

    const [config, header, product, allProducts, anyQuestions] = await Promise.all([
        fetchConfig(),
        fetchHeader(),
        fetchProduct(params.id),
        fetchProducts({
            filters: {
                slug: {
                    $ne: params.id,
                },
            },
        }),
        fetchAnyQuestions(),
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
            allProducts,
            anyQuestions,
        },
    }
}

type TProps = TServerSideProps

export default function Product(props: TProps) {
    const anyQuestions = mapAnyQuestionsServerData(props.anyQuestions, [
        props.product,
        ...(props.allProducts || []),
    ])

    const product: TProductData = mapProductServerData(props.product, props.allProducts)

    return (
        <ProductPage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            product={product}
            anyQuestions={anyQuestions}
        />
    )
}
