import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { ProductPage } from '@/components/ProductPage'
import { TProductData } from '@/components/ProductPage/types'
import {
    fetchAnyQuestions,
    fetchConfig,
    fetchFooter,
    fetchHeader,
    fetchProduct,
    fetchProducts,
} from '@/utils/adminApi'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapProductServerData } from '@/utils/serverDataMappers/product'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    product: GetAttributesValues<'api::product.product'>
    anyQuestions?: GetAttributesValues<'api::any-question.any-question'>
    allProducts?: GetAttributesValues<'api::product.product'>[]
    footer?: GetAttributesValues<'api::footer.footer'>
}

export const getServerSideProps: GetServerSideProps<TServerSideProps, { id: string }> = async ({
    params,
}) => {
    if (!params?.id) {
        return {
            notFound: true,
        }
    }

    const [config, header, product, allProducts, anyQuestions, footer] = await Promise.all([
        fetchConfig(),
        fetchHeader(),
        fetchProduct(params.id),
        fetchProducts(),
        fetchAnyQuestions(),
        fetchFooter(),
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
            footer,
        },
    }
}

type TProps = TServerSideProps

export default function Product(props: TProps) {
    const anyQuestionsData = mapAnyQuestionsServerData(props.anyQuestions, props.allProducts)
    const footerData = mapFooterServerData(props.footer, props.allProducts)

    const product: TProductData = mapProductServerData(props.product)

    return (
        <ProductPage
            //Пробрасываем key для того чтобы next размонтировал и заного смонтировал страницу при переходе между продуктами
            key={props.product.slug}
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            footerData={footerData}
            product={product}
            anyQuestionsData={anyQuestionsData}
        />
    )
}
