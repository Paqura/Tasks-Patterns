import { GetServerSideProps } from 'next'

import { NotFoundPage, TNotFoundPageData } from '@/components/NotFoundPage'
import { getApi } from '@/utils/adminApi'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapNotFoundServerData } from '@/utils/serverDataMappers/notFound'

export type TServerSideProps = TNotFoundPageData

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async (params) => {
    const api = getApi(params.locale)

    const [config, header, footer, notFound, products] = await Promise.all([
        api.fetchConfig(),
        api.fetchHeader(),
        api.fetchFooter(),
        api.fetchNotFound(),
        api.fetchProducts(),
    ])

    const footerData = mapFooterServerData(footer, products)
    const headerData = mapHeaderServerData(header)
    const errorData = mapNotFoundServerData(notFound)

    return {
        props: {
            seo: config?.seo || {},
            headerData,
            footerData,
            errorData,
        },
    }
}

type TProps = TServerSideProps

export default function NotFound(props: TProps) {
    return (
        <NotFoundPage
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            errorData={props.errorData}
        />
    )
}
