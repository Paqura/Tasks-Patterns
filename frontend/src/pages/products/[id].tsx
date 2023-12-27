import { GetServerSideProps } from 'next'

import { ProductScreen, productMapper, type TProductScreenProps } from '@/screens/product'
import { getApi } from '@/services/strapi/api'
import { getPublicationStateFromQuery } from '@/shared/lib/publicationState'
import { anyQuestionMapper } from '@/widgets/AnyQuestions'
import { footerMapper } from '@/widgets/Footer'
import { headerMapper } from '@/widgets/Header'

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

    const anyQuestionsData = anyQuestionMapper.toDomain(anyQuestions, allProducts)
    const footerData = footerMapper.toDomain(footer, allProducts)
    const headerData = headerMapper.toDomain(header)
    const productData = productMapper.toDomain(product)

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
