import { ArticlesList, TArticlesListData } from '@/components/ArticlesList'
import { THeaderData } from '@/components/Header'
import { HeadingSection, THeadingSectionData } from '@/components/HeadingSection'
import { PageLayout, TSeo } from '@/components/PageLayout'

export type TAnalyticsPageData = {
    seo: TSeo
    headerData: THeaderData
    headingSectionData: THeadingSectionData
    articlesListData: TArticlesListData
}

type TAnalyticsPageProps = TAnalyticsPageData

export const AnalyticsPage: React.FC<TAnalyticsPageProps> = (props) => {
    return (
        <PageLayout seo={props.seo} headerData={props.headerData}>
            <HeadingSection data={props.headingSectionData} />
            <ArticlesList data={props.articlesListData} />
        </PageLayout>
    )
}
