import { ArticleDate } from '@/components/ArticleDate'
import {
    ArticleLayoutGrid,
    ArticleLayoutGridLeftColumn,
    ArticleLayoutGridRightColumn,
} from '@/components/ArticleLayout'
import EventCalendar from '@/components/EventCalendar'
import EventForm from '@/components/EventForm'
import EventVideo from '@/components/EventVideo'
import { TFooterData } from '@/components/Footer'
import { THeaderData } from '@/components/Header'
import HelpfulFiles from '@/components/HelpfulFiles'
import NewsArticleHeader from '@/components/NewsArticleHeader'
import { PageLayout, TSeo } from '@/components/PageLayout'
import { MarkdownContent } from '@/components/ui/MarkdownContent'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { TEventArticleData, TEventConfigData } from '@/utils/serverDataMappers/event-article'

import styles from './index.module.scss'

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
                <ArticleLayoutGrid>
                    <ArticleLayoutGridLeftColumn className={styles.dateWrap}>
                        <ArticleDate date={props.eventArticleData.date} />
                    </ArticleLayoutGridLeftColumn>
                    <ArticleLayoutGridRightColumn>
                        {props.eventConfigData &&
                            !props.eventIsCompleted &&
                            props.eventHasAllFormData && (
                                <EventForm
                                    slug={props.slug}
                                    eventConfigData={props.eventConfigData}
                                />
                            )}
                        <MarkdownContent>{props.eventArticleData.content}</MarkdownContent>
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
                    </ArticleLayoutGridRightColumn>
                </ArticleLayoutGrid>

                {props.eventArticleData.files.length > 0 && (
                    <HelpfulFiles
                        files={props.eventArticleData.files}
                        title={props.eventArticleData.filesTitle}
                    />
                )}
            </PageSectionCard>
        </PageLayout>
    )
}
