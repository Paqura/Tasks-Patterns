import { THeaderData as TPageLayoutHeaderData } from '@/components/Header'
import { PageLayout, TSeo } from '@/components/PageLayout'

import { Articles, TArticlesData } from './components/Articles'
import { Header, THeaderData } from './components/Header'

export type TAnalyticsPageData = {
    seo: TSeo
    header: THeaderData
} & TArticlesData &
    TPageLayoutHeaderData

type THomePageProps = TAnalyticsPageData

export const AnalyticsPage: React.FC<THomePageProps> = (props) => {
    return (
        <PageLayout seo={props.seo} navItems={props.navItems}>
            <Header title={props.header.title} description={props.header.description} />
            <Articles articles={props.articles} pagination={props.pagination} />
        </PageLayout>
    )
}
