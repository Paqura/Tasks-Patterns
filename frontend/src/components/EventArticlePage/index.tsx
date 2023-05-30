import { TEventArticleData } from '@/utils/serverDataMappers/news-article'

import EventForm from 'src/components/EventForm'
import { THeaderData } from 'src/components/Header'
import HeaderArticle from 'src/components/HeaderArticle'
import NewsArticle from 'src/components/NewsArticle'
import NewsArticleDate from 'src/components/NewsArticleDate'
import { PageLayout, TSeo } from 'src/components/PageLayout'
import { PageSectionCard } from 'src/components/ui/PageSectionCard'

export type TEventArticlePageData = {
    seo: TSeo
    headerData: THeaderData
    eventArticleData: TEventArticleData
}
type TEventArticlePageProps = TEventArticlePageData
export default function EventArticlePage(props: TEventArticlePageProps) {
    return (
        <PageLayout seo={props.seo} navItems={props.headerData.navItems}>
            <HeaderArticle
                title={props.eventArticleData.title}
                topic={props.eventArticleData.topic}
            />

            <PageSectionCard>
                <NewsArticleDate date={props.eventArticleData.date} />

                <EventForm />

                <NewsArticle {...props.eventArticleData} />
            </PageSectionCard>
        </PageLayout>
    )
}
