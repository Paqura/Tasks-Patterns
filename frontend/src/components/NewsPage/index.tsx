import { AnyQuestions, TAnyQuestionsData } from '@/components/AnyQuestions'
import { ArticlesList, TArticlesListData } from '@/components/ArticlesList'
import { THeaderData } from '@/components/Header'
import { HeadingSection, THeadingSectionData } from '@/components/HeadingSection'
import { PageLayout, TSeo } from '@/components/PageLayout'

export type TNewsPageData = {
    seo: TSeo
    headerData: THeaderData
    headingSectionData: THeadingSectionData
    articlesListData: TArticlesListData
    anyQuestions: TAnyQuestionsData
}

type TNewsPageProps = TNewsPageData

export const NewsPage: React.FC<TNewsPageProps> = (props) => {
    return (
        <PageLayout seo={props.seo} headerData={props.headerData}>
            <HeadingSection data={props.headingSectionData} />
            <ArticlesList data={props.articlesListData} />
            <AnyQuestions anyQuestionData={props.anyQuestions} />
        </PageLayout>
    )
}
