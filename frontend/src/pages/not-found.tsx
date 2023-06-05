import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { NotFoundPage } from '@/components/NotFoundPage'
import {
    fetchHeader,
    fetchConfig,
    fetchNotFound,
    fetchFooter,
    fetchProducts,
} from '@/utils/adminApi'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapNotFoundServerData } from '@/utils/serverDataMappers/notFound'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    footer?: GetAttributesValues<'api::footer.footer'>
    notFound?: GetAttributesValues<'api::not-found.not-found'>
    products?: GetAttributesValues<'api::product.product'>[]
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async () => {
    const [config, header, footer, notFound, products] = await Promise.all([
        fetchConfig(),
        fetchHeader(),
        fetchFooter(),
        fetchNotFound(),
        fetchProducts(),
    ])

    return {
        props: {
            config,
            header,
            footer,
            notFound,
            products,
        },
    }
}

type TProps = TServerSideProps

export default function NotFound(props: TProps) {
    const notFoundErrorData = mapNotFoundServerData(props.notFound)
    const footerData = mapFooterServerData(props.footer, props.products)

    return (
        <NotFoundPage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            footerData={footerData}
            errorData={notFoundErrorData}
        />
    )
}
