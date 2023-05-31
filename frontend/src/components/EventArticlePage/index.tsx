import {
    TEventArticleData,
    TEventFormData,
    TEventVideoData,
} from '@/utils/serverDataMappers/event-article'

import styles from './index.module.scss'

import EventForm from 'src/components/EventForm'
import EventVideo from 'src/components/EventVideo'
import { THeaderData } from 'src/components/Header'
import NewsArticle from 'src/components/NewsArticle'
import NewsArticleDate from 'src/components/NewsArticleDate'
import NewsArticleHeader from 'src/components/NewsArticleHeader'
import { PageLayout, TSeo } from 'src/components/PageLayout'
import { PageSectionCard } from 'src/components/ui/PageSectionCard'

export type TEventArticlePageData = {
    seo: TSeo
    headerData: THeaderData
    eventArticleData: TEventArticleData
    eventFormData?: TEventFormData
    eventVideoData?: TEventVideoData
    eventIsCompleted: boolean
}
type TEventArticlePageProps = TEventArticlePageData
export default function EventArticlePage(props: TEventArticlePageProps) {
    return (
        <PageLayout seo={props.seo} navItems={props.headerData.navItems}>
            <NewsArticleHeader
                image={props?.eventArticleData?.image ?? { src: '' }}
                title={props.eventArticleData.title}
                topic={props.eventArticleData.topic}
            />

            <PageSectionCard>
                <div className={styles.contentWrapper}>
                    <div className={styles.dateWrap}>
                        <NewsArticleDate date={props.eventArticleData.date} />
                    </div>

                    <div className={styles.content}>
                        {props.eventFormData && !props.eventIsCompleted && (
                            <EventForm eventFormData={props.eventFormData} />
                        )}

                        <NewsArticle newsArticleData={props.eventArticleData} />

                        {props.eventVideoData && !props.eventIsCompleted && (
                            <EventVideo eventVideoData={props.eventVideoData} />
                        )}
                    </div>
                </div>
            </PageSectionCard>
        </PageLayout>
    )
}
