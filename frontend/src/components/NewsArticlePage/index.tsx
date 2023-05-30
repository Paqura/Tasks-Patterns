import { TNewsArticleData } from '@/utils/serverDataMappers/news-article'

import { THeaderData } from 'src/components/Header'
import HeaderArticle from 'src/components/HeaderArticle'
import NewsArticle from 'src/components/NewsArticle'
import NewsArticleDate from 'src/components/NewsArticleDate'
import { PageLayout, TSeo } from 'src/components/PageLayout'
import { PageSectionCard } from 'src/components/ui/PageSectionCard'

export type TNewsArticlePageData = {
    seo: TSeo
    headerData: THeaderData
    newsArticleData: TNewsArticleData
}
type TNewsArticlePageProps = TNewsArticlePageData
export default function NewsArticlePage(props: TNewsArticlePageProps) {
    return (
        <PageLayout seo={props.seo} navItems={props.headerData.navItems}>
            <HeaderArticle
                title={props.newsArticleData.title}
                topic={props.newsArticleData.topic}
            />

            <PageSectionCard>
                <NewsArticleDate date={props.newsArticleData.date} />

                <NewsArticle {...props.newsArticleData} />
            </PageSectionCard>
        </PageLayout>
    )
}
