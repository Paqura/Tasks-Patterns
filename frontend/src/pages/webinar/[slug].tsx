import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'
import React from 'react'

import EventArticlePage from '@/components/EventArticlePage'
import { fetchConfig, fetchHeader, fetchNewsArticle } from '@/utils/adminApi'
import { mapEventArticleServerData } from '@/utils/serverDataMappers/event-article'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    newsItem: GetAttributesValues<'api::news-item.news-item'>
}
export const getServerSideProps: GetServerSideProps<TServerSideProps, { slug: string }> = async ({
    params,
}) => {
    if (!params?.slug) {
        return {
            notFound: true,
        }
    }
    const [newsItem, config, header] = await Promise.all([
        fetchNewsArticle(params.slug),
        fetchConfig(),
        fetchHeader(),
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
        },
    }
}
type TProps = TServerSideProps

export default function EventArticleItem(props: TProps) {
    const { article, form } = mapEventArticleServerData(props.newsItem)

    return (
        <EventArticlePage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            eventArticleData={article}
            eventFormData={form}
        />
    )
}
