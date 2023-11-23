import { GetServerSideProps } from 'next'

import { Error404Screen, TError404ScreenProps } from '@/screens/error404'
import { getApi } from '@/shared/lib/adminApi'
import { mapFooterServerData } from '@/shared/lib/serverDataMappers/footer'
import { mapHeaderServerData } from '@/shared/lib/serverDataMappers/header'
import { mapNotFoundServerData } from '@/shared/lib/serverDataMappers/notFound'

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
