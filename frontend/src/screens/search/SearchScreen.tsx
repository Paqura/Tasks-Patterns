import { PageLayout, TSeo } from '@/shared/ui/project/PageLayout'
import { TFooterData } from '@/widgets/Footer'
import { THeaderData } from '@/widgets/Header'

import { HeadingSection, THeadingSectionData } from './ui/HeadingSection'
import { SearchResultsList, TSearchResultsListData } from './ui/SearchResultsList'

export type TSearchScreenData = {
    seo: TSeo
    headerData: THeaderData
    footerData: TFooterData
    headingSectionData: THeadingSectionData
    searchResultsListData: TSearchResultsListData
}

export type TSearchScreenProps = TSearchScreenData

export const SearchScreen = (props: TSearchScreenProps) => {
    const hasNoResults = props.searchResultsListData.searchResults.length === 0

    return (
        <PageLayout seo={props.seo} headerData={props.headerData} footerData={props.footerData}>
            <HeadingSection hasNoResults={hasNoResults} data={props.headingSectionData} />
            <SearchResultsList hasNoResults={hasNoResults} data={props.searchResultsListData} />
        </PageLayout>
    )
}
