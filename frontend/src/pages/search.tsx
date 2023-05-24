import { GetAttributesValues } from '@admin/general-schemas'
import flatMap from 'lodash/flatMap'
import { MeiliSearch, SearchResponse } from 'meilisearch'
import { GetServerSideProps } from 'next'

import { SearchPage } from '@/components/SearchPage'
import { fetchHeader, fetchConfig } from '@/utils/adminApi'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    search: SearchResponse
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async ({ query }) => {
    const searchQuery = Array.isArray(query.q) ? query.q[0] : query.q

    const client = new MeiliSearch({
        host: process.env.MEILISEARCH_HOST || '',
        apiKey: process.env.MEILISEARCH_APP_KEY,
    })

    const index = client.index('searchable-items')
    const search = await index.search(searchQuery, { attributesToHighlight: ['*'] })

    const [config, header] = await Promise.all([fetchConfig(), fetchHeader()])

    return {
        props: {
            config,
            header,
            search,
        },
    }
}

type TProps = TServerSideProps

export default function Search(props: TProps) {
    const searchResults = props.search.hits
        .map((a1) => flatMap(a1._formatted))
        .map((a2) => ({
            title: a2[0] as string,
            description: a2.find((a3) => a3 && a3.includes('<em>')) as string,
            href: '#',
        }))

    return (
        <SearchPage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            searchResultsListData={{ searchResults }}
        />
    )
}
