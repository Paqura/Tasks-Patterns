import { GetServerSideProps } from 'next'

import EventArticlePage, { TEventArticlePageData } from '@/components/EventArticlePage'
import { getApi } from '@/utils/adminApi'
import { getPublicationStateFromQuery } from '@/utils/publicationState'
import {
    mapEventArticleServerData,
    mapWebinarConfigServerData,
} from '@/utils/serverDataMappers/event-article'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'

export type TServerSideProps = TEventArticlePageData

export const getServerSideProps: GetServerSideProps<TServerSideProps, { slug: string }> = async ({
    params,
    locale,
    query,
}) => {
    const api = getApi(locale)

    if (!params?.slug) {
        return {
            notFound: true,
        }
    }
    const [newsItem, config, header, webinarConfig, products, footer] = await Promise.all([
        api.fetchNewsArticle(params.slug, getPublicationStateFromQuery(query)),
        api.fetchConfig(),
        api.fetchHeader(),
        api.fetchWebinarConfig(),
        api.fetchProducts(),
        api.fetchFooter(),
    ])

    if (!newsItem) {
        return {
            notFound: true,
        }
    }

    if (!newsItem.event) {
        return {
            redirect: {
                destination: `${locale}/news/${params.slug}`,
                permanent: true,
            },
        }
    }

    const footerData = mapFooterServerData(footer, products)
    const headerData = mapHeaderServerData(header)

    const {
        article,
        completedVideo,
        calendar,
        isCompleted,
        isRegistrationFinished,
        slug,
        eventHasAllFormData,
    } = mapEventArticleServerData(newsItem)

    const eventConfig = mapWebinarConfigServerData(webinarConfig)

    return {
        props: {
            seo: config?.seo || {},
            headerData,
            footerData,
            slug,
            eventArticleData: article,
            eventConfigData: eventConfig,
            eventCompletedVideo: completedVideo,
            eventCalendar: calendar,
            eventIsCompleted: isCompleted,
            eventRegistrationIsFinished: isRegistrationFinished,
            eventHasAllFormData,
        },
    }
}
type TProps = TServerSideProps

export default function EventArticleItem(props: TProps) {
    return (
        <EventArticlePage
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            slug={props.slug}
            eventArticleData={props.eventArticleData}
            eventConfigData={props.eventConfigData}
            eventCompletedVideo={props.eventCompletedVideo}
            eventCalendar={props.eventCalendar}
            eventIsCompleted={props.eventIsCompleted}
            eventRegistrationIsFinished={props.eventRegistrationIsFinished}
            eventHasAllFormData={props.eventHasAllFormData}
        />
    )
}
