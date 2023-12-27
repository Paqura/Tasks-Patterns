import { GetServerSideProps } from 'next'

import { AnalyticsScreen, TAnalyticsScreenProps } from '@/screens/analytics'
import { getApi } from '@/services/strapi/api'
import { TArticlePreviewData } from '@/shared/ui/project/ArticlesList/ui/Article'
import { anyQuestionMapper } from '@/widgets/AnyQuestions'
import { footerMapper } from '@/widgets/Footer'
import { headerMapper } from '@/widgets/Header'

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

    const anyQuestionsData = anyQuestionMapper.toDomain(anyQuestions, products)
    const footerData = footerMapper.toDomain(footer, products)
    const headerData = headerMapper.toDomain(header)

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
