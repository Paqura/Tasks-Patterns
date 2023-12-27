import { Article } from '@/shared/ui/project/Article'
import { HelpfulFiles } from '@/shared/ui/project/HelpfulFiles'
import { MarkdownContent } from '@/shared/ui/project/MarkdownContent'
import { PageLayout, TSeo } from '@/shared/ui/project/PageLayout'
import { PageSection } from '@/shared/ui/project/PageSection'
import { TFooterData } from '@/widgets/Footer'
import { THeaderData } from '@/widgets/Header'

import styles from './index.module.scss'
import { TEventArticleData, TEventConfigData } from './mappers'
import { EventCalendar } from './ui/EventCalendar'
import { EventForm } from './ui/EventForm'
import { EventVideo } from './ui/EventVideo'

export type TWebinarScreenData = {
    slug: string
    seo: TSeo
    headerData: THeaderData
    footerData: TFooterData
    eventArticleData: TEventArticleData
    eventConfigData?: TEventConfigData
    eventCompletedVideo?: string
    eventCalendar?: string
    eventIsCompleted: boolean
    eventRegistrationIsFinished: boolean
    eventHasAllFormData: boolean
}

export type TWebinarScreenProps = TWebinarScreenData

export const WebinarScreen = (props: TWebinarScreenProps) => {
    return (
        <PageLayout seo={props.seo} headerData={props.headerData} footerData={props.footerData}>
            <Article.Header
                image={props?.eventArticleData?.image}
                title={props.eventArticleData.title}
                topic={props.eventArticleData.topic}
            />

            <PageSection.Card>
                <Article.Layout>
                    <Article.LayoutLeftColumn className={styles.dateWrap}>
                        <Article.Date date={props.eventArticleData.date} />
                    </Article.LayoutLeftColumn>

                    <Article.LayoutRightColumn>
                        {props.eventConfigData &&
                            !props.eventIsCompleted &&
                            !props.eventRegistrationIsFinished &&
                            props.eventHasAllFormData && (
                                <EventForm
                                    slug={props.slug}
                                    eventConfigData={props.eventConfigData}
                                />
                            )}
                        <MarkdownContent>{props.eventArticleData.content}</MarkdownContent>

                        {props.eventCompletedVideo && (
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
                    </Article.LayoutRightColumn>
                </Article.Layout>

                {props.eventArticleData.files.length > 0 && (
                    <HelpfulFiles
                        files={props.eventArticleData.files}
                        title={props.eventArticleData.filesTitle}
                    />
                )}
            </PageSection.Card>
        </PageLayout>
    )
}
