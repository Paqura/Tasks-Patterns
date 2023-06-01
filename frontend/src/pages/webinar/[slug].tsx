import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'
import React from 'react'

import EventArticlePage from '@/components/EventArticlePage'
import { fetchConfig, fetchHeader, fetchNewsArticle, fetchWebinarConfig } from '@/utils/adminApi'
import {
    mapEventArticleServerData,
    mapWebinarConfigServerData,
} from '@/utils/serverDataMappers/event-article'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    newsItem: GetAttributesValues<'api::news-item.news-item'>
    anyQuestions?: GetAttributesValues<'api::any-question.any-question'>
    webinarConfig?: GetAttributesValues<'api::webinar-config.webinar-config'>
}
export const getServerSideProps: GetServerSideProps<TServerSideProps, { slug: string }> = async ({
    params,
}) => {
    if (!params?.slug) {
        return {
            notFound: true,
        }
    }
    const [newsItem, config, header, webinarConfig] = await Promise.all([
        fetchNewsArticle(params.slug),
        fetchConfig(),
        fetchHeader(),
        fetchWebinarConfig(),
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

    return {
        props: {
            newsItem,
            config,
            header,
            webinarConfig,
        },
    }
}
type TProps = TServerSideProps

export default function EventArticleItem(props: TProps) {
    const { article, video, calendar, isCompleted, slug } = mapEventArticleServerData(
        props.newsItem
    )
    const eventConfig = mapWebinarConfigServerData(props.webinarConfig)

    return (
        <EventArticlePage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            slug={slug}
            eventArticleData={article}
            eventConfigData={eventConfig}
            eventVideo={video}
            eventCalendar={calendar}
            eventIsCompleted={isCompleted}
        />
    )
}
