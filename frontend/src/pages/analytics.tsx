import { GetServerSideProps } from 'next'

import { AnalyticsScreen, TAnalyticsScreenProps } from '@/screens/analytics'
import { getApi } from '@/shared/lib/adminApi'
import { mapAnyQuestionsServerData } from '@/shared/lib/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/shared/lib/serverDataMappers/footer'
import { mapHeaderServerData } from '@/shared/lib/serverDataMappers/header'
import { TArticlePreviewData } from '@/shared/ui/project/ArticlesList/ui/Article'

export type TServerSideProps = TAnalyticsScreenProps

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

    const articlesList: TArticlePreviewData[] =
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
        <AnalyticsScreen
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            headingSectionData={props.headingSectionData}
            articlesListData={props.articlesListData}
            anyQuestions={props.anyQuestions}
        />
    )
}
