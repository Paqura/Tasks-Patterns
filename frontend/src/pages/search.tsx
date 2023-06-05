import { GetAttributesValues } from '@admin/general-schemas'
import { SearchResponse } from 'meilisearch'
import { GetServerSideProps } from 'next'

import { SearchPage } from '@/components/SearchPage'
import {
    fetchHeader,
    fetchConfig,
    fetchSearchPage,
    fetchFooter,
    fetchProducts,
} from '@/utils/adminApi'
import { getSearchResponse, getSearchString } from '@/utils/meilisearchApi'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapSearchResponseServerData } from '@/utils/serverDataMappers/search'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    footer?: GetAttributesValues<'api::footer.footer'>
    products?: GetAttributesValues<'api::product.product'>[]
    searchPage?: GetAttributesValues<'api::search-page.search-page'>
    searchResponse: SearchResponse | null
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async ({ query }) => {
    const searchString = getSearchString(query.q)

    if (!searchString) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
            props: {},
        }
    }

    const [config, header, footer, products, searchPage, searchResponse] = await Promise.all([
        fetchConfig(),
        fetchHeader(),
        fetchFooter(),
        fetchProducts(),
        fetchSearchPage(),
        getSearchResponse(searchString),
    ])

    return {
        props: {
            config,
            header,
            footer,
            products,
            searchPage,
            searchResponse,
        },
    }
}

type TProps = TServerSideProps

export default function Search(props: TProps) {
    const headingSectionData = {
        title: props.searchPage?.title || '',
        hasNoResultsTitle: props.searchPage?.hasNoResultsTitle || '',
        searchQuery: props.searchResponse?.query || '',
    }

    const searchResults = mapSearchResponseServerData(props.searchResponse)

    const searchResultsListData = {
        searchQuery: props.searchResponse?.query || '',
        searchResults,
        noResultsBlockTitle: props.searchPage?.noResultsBlockTitle || '',
        noResultsBlockDescription: props.searchPage?.noResultsBlockDescription || '',
    }

    const footerData = mapFooterServerData(props.footer, props.products)

    return (
        <SearchPage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            footerData={footerData}
            headingSectionData={headingSectionData}
            searchResultsListData={searchResultsListData}
        />
    )
}
