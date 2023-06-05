import { AnyQuestions, TAnyQuestionsData } from '@/components/AnyQuestions'
import { ArticlesList, TArticlesListData } from '@/components/ArticlesList'
import { TFooterData } from '@/components/Footer'
import { THeaderData } from '@/components/Header'
import { HeadingSection, THeadingSectionData } from '@/components/HeadingSection'
import { PageLayout, TSeo } from '@/components/PageLayout'
import { CONTACTS_SECTION_ID } from '@/utils/constants'

export type TAnalyticsPageData = {
    seo: TSeo
    headerData: THeaderData
    footerData: TFooterData
    headingSectionData: THeadingSectionData
    articlesListData: TArticlesListData
    anyQuestions: TAnyQuestionsData
}

type TAnalyticsPageProps = TAnalyticsPageData

export const AnalyticsPage: React.FC<TAnalyticsPageProps> = (props) => {
    return (
        <PageLayout seo={props.seo} headerData={props.headerData}>
            <HeadingSection data={props.headingSectionData} />
            <ArticlesList data={props.articlesListData} />
            <AnyQuestions sectionId={CONTACTS_SECTION_ID} anyQuestionData={props.anyQuestions} />
        </PageLayout>
    )
}
