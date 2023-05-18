import { GetAttributesValues, CollectionMetadata } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { AnalyticsPage, TAnalyticsPageData } from '@/components/AnalyticsPage'
import { fetchHeader, fetchConfig, fetchArticles, fetchAnalyticsPage } from '@/utils/adminApi'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    analyticsPage?: GetAttributesValues<'api::analytics-page.analytics-page'>
    articles?: GetAttributesValues<'api::analytic-article.analytic-article'>[]
    pagination: CollectionMetadata['pagination']
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async ({ query }) => {
    const page = Number(query.page) || 1

    const [config, header, analyticsPage, { articles, pagination }] = await Promise.all([
        fetchConfig(),
        fetchHeader(),
        fetchAnalyticsPage(),
        fetchArticles(page),
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
                description: article.topic || '',
                date: article.published && new Date(article.published),
                href: article.slug || '/',
            }
        }) || []

    return (
        <AnalyticsPage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            headingSectionData={headingSection}
            articlesListData={{ articles, pagination: props.pagination }}
        />
    )
}
