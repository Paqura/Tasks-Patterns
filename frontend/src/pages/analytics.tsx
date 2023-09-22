import { GetServerSideProps } from 'next'

import { AnalyticsPage, TAnalyticsPageData } from '@/components/AnalyticsPage'
import { getApi } from '@/utils/adminApi'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'

export type TServerSideProps = TAnalyticsPageData

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async ({
    query,
    locale,
}) => {
    const page = Number(query.page) || 1
    const api = getApi(locale)

    const [
        config,
        header,
        analyticsPage,
        { articles, pagination },
        products,
        anyQuestions,
        footer,
    ] = await Promise.all([
        api.fetchConfig(),
        api.fetchHeader(),
        api.fetchAnalyticsPage(),
        api.fetchArticles(page),
        api.fetchProducts(),
        api.fetchAnyQuestions(),
        api.fetchFooter(),
    ])

    if (pagination.page && pagination.page > 1 && pagination.page > pagination.pageCount) {
        return {
            redirect: {
                permanent: false,
                destination: `${locale}/analytics`,
            },
            props: {},
        }
    }

    const anyQuestionsData = mapAnyQuestionsServerData(anyQuestions, products)
    const footerData = mapFooterServerData(footer, products)
    const headerData = mapHeaderServerData(header)

    const headingSectionData = {
        title: analyticsPage?.title || '',
        description: analyticsPage?.description || '',
    }

    const articlesList: TAnalyticsPageData['articlesListData']['articles'] =
        articles?.map((article) => {
            return {
                title: article.title || '',
                topic: article.topic || '',
                date: article.published && article.published,
                href: `/analytics/${article.slug}` || '/',
                image: null,
            }
        }) || []

    return {
        props: {
            seo: config?.seo || {},
            headerData,
            footerData,
            headingSectionData,
            articlesListData: { articles: articlesList, pagination: pagination },
            anyQuestions: anyQuestionsData,
        },
    }
}

type TProps = TServerSideProps

export default function Analytics(props: TProps) {
    return (
        <AnalyticsPage
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            headingSectionData={props.headingSectionData}
            articlesListData={props.articlesListData}
            anyQuestions={props.anyQuestions}
        />
    )
}
