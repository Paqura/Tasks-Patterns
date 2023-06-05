import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { NotFoundPage } from '@/components/NotFoundPage'
import { fetchHeader, fetchConfig, fetchNotFound } from '@/utils/adminApi'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapNotFoundServerData } from '@/utils/serverDataMappers/notFound'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    notFound?: GetAttributesValues<'api::not-found.not-found'>
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async () => {
    const [config, header, notFound] = await Promise.all([
        fetchConfig(),
        fetchHeader(),
        fetchNotFound(),
    ])

    return {
        props: {
            config,
            header,
            notFound,
        },
    }
}

type TProps = TServerSideProps

export default function NotFound(props: TProps) {
    const notFoundErrorData = mapNotFoundServerData(props.notFound)

    return (
        <NotFoundPage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            errorData={notFoundErrorData}
        />
    )
}
