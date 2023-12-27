import { GetServerSideProps } from 'next'

import { Error404Screen, TError404ScreenProps, notFoundMapper } from '@/screens/error404'
import { getApi } from '@/services/strapi/api'
import { footerMapper } from '@/widgets/Footer'
import { headerMapper } from '@/widgets/Header'

export type TServerSideProps = TError404ScreenProps

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async (params) => {
    const api = getApi(params.locale)

    const [config, header, footer, notFound, products] = await Promise.all([
        api.fetchConfig(),
        api.fetchHeader(),
        api.fetchFooter(),
        api.fetchNotFound(),
        api.fetchProducts(),
    ])

    const footerData = footerMapper.toDomain(footer, products)
    const headerData = headerMapper.toDomain(header)
    const errorData = notFoundMapper.toDomain(notFound)

    return {
        props: {
            seo: config?.seo || {},
            headerData,
            footerData,
            errorData,
        },
    }
}

export default function NotFound(props: TServerSideProps) {
    return (
        <Error404Screen
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            errorData={props.errorData}
        />
    )
}
