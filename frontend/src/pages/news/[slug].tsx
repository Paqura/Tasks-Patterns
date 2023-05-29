import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'
import React from 'react'

import NewsArticle from '@/components/NewsArticle'
import { fetchConfig, fetchHeader, fetchNewsArticle } from '@/utils/adminApi'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapNewsArticleServerData } from '@/utils/serverDataMappers/news-article'

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
    return {
        props: {
            newsItem,
            config,
            header,
        },
    }
}
type TProps = TServerSideProps

export default function NewsArticleItem(props: TProps) {
    const article = mapNewsArticleServerData(props.newsItem)

    return (
        <NewsArticle
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            newsArticleData={article}
        />
    )
}
