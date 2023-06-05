import { AnyQuestions, TAnyQuestionsData } from '@/components/AnyQuestions'
import { ArticlesList, TArticlesListData } from '@/components/ArticlesList'
import { TFooterData } from '@/components/Footer'
import { THeaderData } from '@/components/Header'
import { HeadingSection, THeadingSectionData } from '@/components/HeadingSection'
import { PageLayout, TSeo } from '@/components/PageLayout'

export type TNewsPageData = {
    seo: TSeo
    headerData: THeaderData
    footerData: TFooterData
    headingSectionData: THeadingSectionData
    articlesListData: TArticlesListData
    anyQuestions: TAnyQuestionsData
}

type TNewsPageProps = TNewsPageData

export const NewsPage: React.FC<TNewsPageProps> = (props) => {
    return (
        <PageLayout seo={props.seo} headerData={props.headerData} footerData={props.footerData}>
            <HeadingSection data={props.headingSectionData} />
            <ArticlesList data={props.articlesListData} />
            <AnyQuestions anyQuestionData={props.anyQuestions} />
        </PageLayout>
    )
}
