import { GetServerSideProps } from 'next'

import { TWebinarScreenProps, WebinarScreen } from '@/screens/webinar'
import { getApi } from '@/shared/lib/adminApi'
import { getPublicationStateFromQuery } from '@/shared/lib/publicationState'
import {
    mapEventArticleServerData,
    mapWebinarConfigServerData,
} from '@/shared/lib/serverDataMappers/event-article'
import { mapFooterServerData } from '@/shared/lib/serverDataMappers/footer'
import { mapHeaderServerData } from '@/shared/lib/serverDataMappers/header'

export type TServerSideProps = TWebinarScreenProps

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

export default function Webinar(props: TServerSideProps) {
    return (
        <WebinarScreen
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
