import { THeaderData } from '@/components/Header'
import { PageLayout, TSeo } from '@/components/PageLayout'

import { HeadingSection, THeadingSectionData } from './components/HeadingSection'
import { SearchResultsList, TSearchResultsListData } from './components/SearchResultsList'

export type TSearchPageData = {
    seo: TSeo
    headerData: THeaderData
    headingSectionData: THeadingSectionData
    searchResultsListData: TSearchResultsListData
}

type TSearchPageProps = TSearchPageData

export const SearchPage: React.FC<TSearchPageProps> = (props) => {
    const hasNoResults = props.searchResultsListData.searchResults.length === 0

    return (
        <PageLayout seo={props.seo} headerData={props.headerData}>
            <HeadingSection hasNoResults={hasNoResults} data={props.headingSectionData} />
            <SearchResultsList hasNoResults={hasNoResults} data={props.searchResultsListData} />
        </PageLayout>
    )
}
