import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'
import React from 'react'

import { AnalyticalArticlePage } from '@/components/AnalyticalArticlePage'
import {
    fetchAnalyticArticle,
    fetchAnyQuestions,
    fetchConfig,
    fetchHeader,
    fetchProducts,
} from '@/utils/adminApi'
import { mapArticleServerData } from '@/utils/serverDataMappers/analytic-article'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    article: GetAttributesValues<'api::analytic-article.analytic-article'>
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
    const [article, config, header, products, anyQuestions] = await Promise.all([
        fetchAnalyticArticle(params.slug),
        fetchConfig(),
        fetchHeader(),
        fetchProducts(),
        fetchAnyQuestions(),
    ])
    if (!article) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            article,
            config,
            header,
            products,
            anyQuestions,
        },
    }
}

type TProps = TServerSideProps

export default function AnalyticalArticle(props: TProps) {
    const article = mapArticleServerData(props.article)
    const anyQuestions = mapAnyQuestionsServerData(props.anyQuestions, props.products)

    return (
        <AnalyticalArticlePage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            analyticArticleData={article}
            anyQuestions={anyQuestions}
        />
    )
}
