import { THeaderData } from '@/components/Header'
import { PageLayout, TSeo } from '@/components/PageLayout'

import { HeadingSection } from './components/HeadingSection'
import { SearchResultsList, TSearchResultsListData } from './components/SearchResultsList'

export type TSearchPageData = {
    seo: TSeo
    headerData: THeaderData
    // headingSectionData: THeadingSectionData
    searchResultsListData: TSearchResultsListData
}

type TSearchPageProps = TSearchPageData

export const SearchPage: React.FC<TSearchPageProps> = (props) => {
    const searchQuery = 'Test'

    return (
        <PageLayout seo={props.seo} navItems={props.headerData.navItems}>
            <HeadingSection data={{ searchQuery }} />
            <SearchResultsList data={props.searchResultsListData} />
        </PageLayout>
    )
}
