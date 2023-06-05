import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'
import React from 'react'

import NewsArticlePage from '@/components/NewsArticlePage'
import {
    fetchAnyQuestions,
    fetchConfig,
    fetchHeader,
    fetchNewsArticle,
    fetchProducts,
} from '@/utils/adminApi'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapNewsArticleServerData } from '@/utils/serverDataMappers/news-article'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    newsItem: GetAttributesValues<'api::news-item.news-item'>
    products?: GetAttributesValues<'api::product.product'>[]
    anyQuestions?: GetAttributesValues<'api::any-question.any-question'>
}
export const getServerSideProps: GetServerSideProps<TServerSideProps, { slug: string }> = async ({
    params,
}) => {
    if (!params?.slug) {
        return {
            notFound: true,
        }
    }
    const [newsItem, config, header, products, anyQuestions] = await Promise.all([
        fetchNewsArticle(params.slug),
        fetchConfig(),
        fetchHeader(),
        fetchProducts(),
        fetchAnyQuestions(),
    ])

    if (!newsItem) {
        return {
            notFound: true,
        }
    }
    if (newsItem?.isEvent) {
        return {
            redirect: {
                destination: `/webinar/${params.slug}`,
                permanent: true,
            },
        }
    }
    return {
        props: {
            newsItem,
            config,
            header,
            products,
            anyQuestions,
        },
    }
}
type TProps = TServerSideProps

export default function NewsArticleItem(props: TProps) {
    const article = mapNewsArticleServerData(props.newsItem)
    const anyQuestions = mapAnyQuestionsServerData(props.anyQuestions, props.products)

    return (
        <NewsArticlePage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            newsArticleData={article}
            anyQuestions={anyQuestions}
        />
    )
}
