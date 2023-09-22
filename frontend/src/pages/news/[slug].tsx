import { GetServerSideProps } from 'next'
import React from 'react'

import NewsArticlePage, { TNewsArticlePageData } from '@/components/NewsArticlePage'
import { getApi } from '@/utils/adminApi'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapNewsArticleServerData } from '@/utils/serverDataMappers/news-article'

export type TServerSideProps = TNewsArticlePageData

export const getServerSideProps: GetServerSideProps<TServerSideProps, { slug: string }> = async ({
    params,
    locale,
}) => {
    if (!params?.slug) {
        return {
            notFound: true,
        }
    }

    const api = getApi(locale)

    const [newsItem, config, header, products, anyQuestions, footer] = await Promise.all([
        api.fetchNewsArticle(params.slug),
        api.fetchConfig(),
        api.fetchHeader(),
        api.fetchProducts(),
        api.fetchAnyQuestions(),
        api.fetchFooter(),
    ])

    if (!newsItem) {
        return {
            notFound: true,
        }
    }
    if (!!newsItem?.event) {
        return {
            redirect: {
                destination: `${locale}/webinar/${params.slug}`,
                permanent: true,
            },
        }
    }

    const anyQuestionsData = mapAnyQuestionsServerData(anyQuestions, products)
    const footerData = mapFooterServerData(footer, products)
    const headerData = mapHeaderServerData(header)
    const newsArticleData = mapNewsArticleServerData(newsItem)

    return {
        props: {
            seo: config?.seo || {},
            headerData,
            footerData,
            newsArticleData,
            anyQuestionsData,
        },
    }
}
type TProps = TServerSideProps

export default function NewsArticleItem(props: TProps) {
    return (
        <NewsArticlePage
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            newsArticleData={props.newsArticleData}
            anyQuestionsData={props.anyQuestionsData}
        />
    )
}
