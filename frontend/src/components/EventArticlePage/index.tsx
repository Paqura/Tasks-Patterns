import { TFooterData } from '@/components/Footer'
import HelpfulFiles from '@/components/HelpfulFiles'
import { TEventArticleData, TEventConfigData } from '@/utils/serverDataMappers/event-article'

import styles from './index.module.scss'

import EventCalendar from 'src/components/EventCalendar'
import EventForm from 'src/components/EventForm'
import EventVideo from 'src/components/EventVideo'
import { THeaderData } from 'src/components/Header'
import NewsArticle from 'src/components/NewsArticle'
import NewsArticleDate from 'src/components/NewsArticleDate'
import NewsArticleHeader from 'src/components/NewsArticleHeader'
import { PageLayout, TSeo } from 'src/components/PageLayout'
import { PageSectionCard } from 'src/components/ui/PageSectionCard'

export type TEventArticlePageData = {
    slug: string
    seo: TSeo
    headerData: THeaderData
    footerData: TFooterData
    eventArticleData: TEventArticleData
    eventConfigData?: TEventConfigData
    eventCompletedVideo?: string
    eventCalendar?: string
    eventIsCompleted: boolean
    eventHasAllFormData: boolean
}
type TEventArticlePageProps = TEventArticlePageData
export default function EventArticlePage(props: TEventArticlePageProps) {
    return (
        <PageLayout seo={props.seo} headerData={props.headerData} footerData={props.footerData}>
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
                        {props.eventConfigData &&
                            !props.eventIsCompleted &&
                            props.eventHasAllFormData && (
                                <EventForm
                                    slug={props.slug}
                                    eventConfigData={props.eventConfigData}
                                />
                            )}

                        <NewsArticle newsArticleData={props.eventArticleData} />

                        {props.eventCompletedVideo && props.eventIsCompleted && (
                            <EventVideo videoId={props.eventCompletedVideo} />
                        )}

                        {props.eventCalendar &&
                            props.eventConfigData &&
                            !props.eventIsCompleted && (
                                <EventCalendar
                                    eventConfigData={props.eventConfigData}
                                    calendar={props.eventCalendar}
                                />
                            )}
                    </div>
                </div>

                {props.eventArticleData.files.length > 0 && (
                    <div className={styles.helpfulFilesWrap}>
                        <div className={styles.helpfulFiles}>
                            <HelpfulFiles
                                files={props.eventArticleData.files}
                                title={props.eventArticleData.filesTitle}
                            />
                        </div>
                    </div>
                )}
            </PageSectionCard>
        </PageLayout>
    )
}
