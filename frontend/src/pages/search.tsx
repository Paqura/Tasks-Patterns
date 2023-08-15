import { GetServerSideProps } from 'next'

import { SearchPage, TSearchPageData } from '@/components/SearchPage'
import { getApi } from '@/utils/adminApi'
import { getSearchResponse, getSearchString } from '@/utils/meilisearchApi'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapSearchResponseServerData } from '@/utils/serverDataMappers/search'

export type TServerSideProps = TSearchPageData

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async ({
    query,
    locale,
}) => {
    const api = getApi(locale)

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
        api.fetchConfig(),
        api.fetchHeader(),
        api.fetchFooter(),
        api.fetchProducts(),
        api.fetchSearchPage(),
        getSearchResponse(searchString),
    ])

    const footerData = mapFooterServerData(footer, products)
    const headerData = mapHeaderServerData(header)

    const headingSectionData = {
        title: searchPage?.title || '',
        hasNoResultsTitle: searchPage?.hasNoResultsTitle || '',
        searchQuery: searchResponse?.query || '',
    }

    const searchResults = mapSearchResponseServerData(searchResponse)

    const searchResultsListData = {
        searchQuery: searchResponse?.query || '',
        searchResults,
        noResultsBlockTitle: searchPage?.noResultsBlockTitle || '',
        noResultsBlockDescription: searchPage?.noResultsBlockDescription || '',
    }

    return {
        props: {
            seo: config?.seo || {},
            headerData,
            footerData,
            headingSectionData,
            searchResultsListData,
        },
    }
}

type TProps = TServerSideProps

export default function Search(props: TProps) {
    return (
        <SearchPage
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            headingSectionData={props.headingSectionData}
            searchResultsListData={props.searchResultsListData}
        />
    )
}
