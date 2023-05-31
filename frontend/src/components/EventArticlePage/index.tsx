import { TEventArticleData, TEventFormData } from '@/utils/serverDataMappers/event-article'

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
    eventFormData?: TEventFormData
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

                {props.eventFormData && <EventForm eventFormData={props.eventFormData} />}

                <NewsArticle newsArticleData={props.eventArticleData} />
            </PageSectionCard>
        </PageLayout>
    )
}
