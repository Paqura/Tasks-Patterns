import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'
import React from 'react'

import { AnalyticalArticlePage } from '@/components/AnalyticalArticlePage'
import { fetchAnalyticArticle, fetchConfig, fetchHeader } from '@/utils/adminApi'
import { mapArticleServerData } from '@/utils/serverDataMappers/analytic-article'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    article: GetAttributesValues<'api::analytic-article.analytic-article'>
}
export const getServerSideProps: GetServerSideProps<TServerSideProps, { slug: string }> = async ({
    params,
}) => {
    if (!params?.slug) {
        return {
            notFound: true,
        }
    }
    const [article, config, header] = await Promise.all([
        fetchAnalyticArticle(params.slug),
        fetchConfig(),
        fetchHeader(),
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
        },
    }
}

type TProps = TServerSideProps

export default function AnalyticalArticle(props: TProps) {
    const article = mapArticleServerData(props.article)

    return (
        <AnalyticalArticlePage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            analyticArticleData={article}
        />
    )
}
