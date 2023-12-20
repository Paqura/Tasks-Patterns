import { GetServerSideProps } from 'next'

import { ProductScreen, type TProductData, type TProductScreenProps } from '@/screens/product'
import { getApi } from '@/services/strapi/api'
import { getPublicationStateFromQuery } from '@/shared/lib/publicationState'
import { mapAnyQuestionsServerData } from '@/shared/lib/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/shared/lib/serverDataMappers/footer'
import { mapHeaderServerData } from '@/shared/lib/serverDataMappers/header'
import { mapProductServerData } from '@/shared/lib/serverDataMappers/product'

export type TServerSideProps = TProductScreenProps & {
    slug: string
}

export const getServerSideProps: GetServerSideProps<TServerSideProps, { id: string }> = async ({
    params,
    locale,
    query,
}) => {
    if (!params?.id) {
        return {
            notFound: true,
        }
    }

    const api = getApi(locale)

    const [config, header, product, allProducts, anyQuestions, footer] = await Promise.all([
        api.fetchConfig(),
        api.fetchHeader(),
        api.fetchProduct(params.id, getPublicationStateFromQuery(query)),
        api.fetchProducts(),
        api.fetchAnyQuestions(),
        api.fetchFooter(),
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
        <ProductScreen
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
