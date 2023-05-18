import { GetAttributesValues, CollectionMetadata } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { AnalyticsPage, TAnalyticsPageData } from '@/components/AnalyticsPage'
import { THeaderData } from '@/components/Header'
import { fetchHeader, fetchConfig, fetchArticles, fetchAnalyticsPage } from '@/utils/adminApi'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    analyticsPage?: GetAttributesValues<'api::analytics-page.analytics-page'>
    articles?: GetAttributesValues<'api::analytic-article.analytic-article'>[]
    pagination: CollectionMetadata['pagination']
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async ({ query }) => {
    const config = await fetchConfig()
    const header = await fetchHeader()
    const analyticsPage = await fetchAnalyticsPage()

    const page = Number(query.page) || 1

    const { articles, pagination } = await fetchArticles(page)

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
    const navItems: THeaderData['navItems'] =
        props.header?.navItem?.map((item) => ({
            title: item.title || '',
            link: item.link || '/',
            subItems:
                item.navSubItem?.map((subItem) => ({
                    title: subItem.title || '',
                    description: subItem.description || '',
                    link: subItem.link || '/',
                })) || [],
        })) || []

    const header = {
        title: props.analyticsPage?.title || '',
        description: props.analyticsPage?.description || '',
    }

    const articles: TAnalyticsPageData['articles'] =
        props.articles?.map((article) => {
            return {
                title: article.title || '',
                description: article.topic || '',
                date: article.published && new Date(article.published),
                href: article.link || '/',
            }
        }) || []

    return (
        <AnalyticsPage
            seo={props.config?.seo || {}}
            navItems={navItems}
            header={header}
            articles={articles}
            pagination={props.pagination}
        />
    )
}
