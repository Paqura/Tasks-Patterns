import { ArticlesList, TArticlesListData } from '@/shared/ui/project/ArticlesList'
import { HeadingSection, THeadingSectionData } from '@/shared/ui/project/HeadingSection'
import { PageLayout, TSeo } from '@/shared/ui/project/PageLayout'
import { AnyQuestions, TAnyQuestionsData } from '@/widgets/AnyQuestions'
import { TFooterData } from '@/widgets/Footer'
import { THeaderData } from '@/widgets/Header'

export type TAnalyticsScreenData = {
    seo: TSeo
    headerData: THeaderData
    footerData: TFooterData
    headingSectionData: THeadingSectionData
    articlesListData: TArticlesListData
    anyQuestions: TAnyQuestionsData
}

export type TAnalyticsScreenProps = TAnalyticsScreenData

export const AnalyticsScreen = (props: TAnalyticsScreenProps) => {
    return (
        <PageLayout seo={props.seo} headerData={props.headerData} footerData={props.footerData}>
            <HeadingSection data={props.headingSectionData} />
            <ArticlesList data={props.articlesListData} />
            <AnyQuestions anyQuestionData={props.anyQuestions} />
        </PageLayout>
    )
}
