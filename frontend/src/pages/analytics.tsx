import { GetAttributesValues, CollectionMetadata } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { AnalyticsPage, TAnalyticsPageData } from '@/components/AnalyticsPage'
import {
    fetchHeader,
    fetchConfig,
    fetchArticles,
    fetchAnalyticsPage,
    fetchProducts,
    fetchAnyQuestions,
} from '@/utils/adminApi'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    analyticsPage?: GetAttributesValues<'api::analytics-page.analytics-page'>
    articles?: GetAttributesValues<'api::analytic-article.analytic-article'>[]
    pagination: CollectionMetadata['pagination']
    products?: GetAttributesValues<'api::product.product'>[]
    anyQuestions?: GetAttributesValues<'api::any-question.any-question'>
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async ({ query }) => {
    const page = Number(query.page) || 1

    const [config, header, analyticsPage, { articles, pagination }, products, anyQuestions] =
        await Promise.all([
            fetchConfig(),
            fetchHeader(),
            fetchAnalyticsPage(),
            fetchArticles(page),
            fetchProducts(),
            fetchAnyQuestions(),
        ])

    if (pagination.page > pagination.pageCount) {
        return {
            redirect: {
                permanent: false,
                destination: '/analytics',
            },
            props: {},
        }
    }

    return {
        props: {
            config,
            header,
            analyticsPage,
            articles,
            pagination,
            products,
            anyQuestions,
        },
    }
}

type TProps = TServerSideProps

export default function Analytics(props: TProps) {
    const headingSection = {
        title: props.analyticsPage?.title || '',
        description: props.analyticsPage?.description || '',
    }

    const articles: TAnalyticsPageData['articlesListData']['articles'] =
        props.articles?.map((article) => {
            return {
                title: article.title || '',
                topic: article.topic || '',
                date: article.published && new Date(article.published),
                href: `/analytics/${article.slug}` || '/',
            }
        }) || []

    const anyQuestions = mapAnyQuestionsServerData(props.anyQuestions, props.products)

    return (
        <AnalyticsPage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            headingSectionData={headingSection}
            articlesListData={{ articles, pagination: props.pagination }}
            anyQuestions={anyQuestions}
        />
    )
}
