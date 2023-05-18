import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'
import React from 'react'

import AnalyticalArticle from '@/components/AnaliticalArticle'
import { fetchArticle, fetchConfig, fetchHeader } from '@/utils/adminApi'
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
        fetchArticle(params.slug),
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

export default function AnalyticalArticlePage(props: TProps) {
    const article = mapArticleServerData(props.article)

    return (
        <AnalyticalArticle
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            analyticArticleData={article}
        />
    )
}
