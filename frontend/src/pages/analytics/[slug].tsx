import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'
import React from 'react'

import { AnalyticalArticlePage } from '@/components/AnalyticalArticlePage'
import {
    fetchAnalyticArticle,
    fetchAnyQuestions,
    fetchConfig,
    fetchFooter,
    fetchHeader,
    fetchProducts,
} from '@/utils/adminApi'
import { mapArticleServerData } from '@/utils/serverDataMappers/analytic-article'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'

export type TServerSideProps = {
    article: GetAttributesValues<'api::analytic-article.analytic-article'>
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    footer?: GetAttributesValues<'api::footer.footer'>
    anyQuestions?: GetAttributesValues<'api::any-question.any-question'>
    products?: GetAttributesValues<'api::product.product'>[]
}
export const getServerSideProps: GetServerSideProps<TServerSideProps, { slug: string }> = async ({
    params,
}) => {
    if (!params?.slug) {
        return {
            notFound: true,
        }
    }
    const [article, config, header, footer, anyQuestions, products] = await Promise.all([
        fetchAnalyticArticle(params.slug),
        fetchConfig(),
        fetchHeader(),
        fetchFooter(),
        fetchAnyQuestions(),
        fetchProducts(),
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
            footer,
            anyQuestions,
            products,
        },
    }
}

type TProps = TServerSideProps

export default function AnalyticalArticle(props: TProps) {
    const article = mapArticleServerData(props.article)
    const footerData = mapFooterServerData(props.footer, props.products)
    const anyQuestionsData = mapAnyQuestionsServerData(props.anyQuestions, props.products)

    return (
        <AnalyticalArticlePage
            analyticArticleData={article}
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            footerData={footerData}
            anyQuestionsData={anyQuestionsData}
        />
    )
}
