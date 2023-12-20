import { GetServerSideProps } from 'next'

import { SearchScreen, TSearchScreenProps } from '@/screens/search'
import { getSearchResponse, getSearchString } from '@/services/meilisearch'
import { getApi } from '@/services/strapi/api'
import { mapFooterServerData } from '@/shared/lib/serverDataMappers/footer'
import { mapHeaderServerData } from '@/shared/lib/serverDataMappers/header'
import { mapSearchResponseServerData } from '@/shared/lib/serverDataMappers/search'

export type TServerSideProps = TSearchScreenProps

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
        getSearchResponse(searchString, locale),
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
        <SearchScreen
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            headingSectionData={props.headingSectionData}
            searchResultsListData={props.searchResultsListData}
        />
    )
}
