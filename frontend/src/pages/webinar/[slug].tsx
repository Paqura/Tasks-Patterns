import { GetServerSideProps } from 'next'
import React from 'react'

import EventArticlePage, { TEventArticlePageData } from '@/components/EventArticlePage'
import {
    fetchConfig,
    fetchFooter,
    fetchHeader,
    fetchNewsArticle,
    fetchProducts,
    fetchWebinarConfig,
} from '@/utils/adminApi'
import {
    mapEventArticleServerData,
    mapWebinarConfigServerData,
} from '@/utils/serverDataMappers/event-article'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'

export type TServerSideProps = TEventArticlePageData

export const getServerSideProps: GetServerSideProps<TServerSideProps, { slug: string }> = async ({
    params,
}) => {
    if (!params?.slug) {
        return {
            notFound: true,
        }
    }
    const [newsItem, config, header, webinarConfig, products, footer] = await Promise.all([
        fetchNewsArticle(params.slug),
        fetchConfig(),
        fetchHeader(),
        fetchWebinarConfig(),
        fetchProducts(),
        fetchFooter(),
    ])

    if (!newsItem) {
        return {
            notFound: true,
        }
    }

    if (!newsItem?.isEvent) {
        return {
            redirect: {
                destination: `/news/${params.slug}`,
                permanent: true,
            },
        }
    }
    const footerData = mapFooterServerData(footer, products)
    const headerData = mapHeaderServerData(header)

    const { article, completedVideo, calendar, isCompleted, slug, eventHasAllFormData } =
        mapEventArticleServerData(newsItem)
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
            eventHasAllFormData={props.eventHasAllFormData}
        />
    )
}
