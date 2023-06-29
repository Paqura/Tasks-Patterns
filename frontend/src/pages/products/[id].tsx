import { GetServerSideProps } from 'next'

import { ProductPage, TProductPageData } from '@/components/ProductPage'
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

export type TServerSideProps = TProductPageData & {
    slug: string
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

    const anyQuestionsData = mapAnyQuestionsServerData(anyQuestions, allProducts)
    const footerData = mapFooterServerData(footer, allProducts)
    const headerData = mapHeaderServerData(header)
    const productData: TProductData = mapProductServerData(product)

    return {
        props: {
            slug: product.slug || '',
            seo: config?.seo || {},
            headerData,
            footerData,
            product: productData,
            anyQuestionsData,
        },
    }
}

type TProps = TServerSideProps

export default function Product(props: TProps) {
    return (
        <ProductPage
            //Пробрасываем key для того чтобы next размонтировал и заного смонтировал страницу при переходе между продуктами
            key={props.slug}
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            product={props.product}
            anyQuestionsData={props.anyQuestionsData}
        />
    )
}
