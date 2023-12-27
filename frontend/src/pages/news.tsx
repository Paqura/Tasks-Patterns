import { GetServerSideProps } from 'next'

import { NewsScreen, TNewsScreenData, TNewsScreenProps } from '@/screens/news'
import { getApi } from '@/services/strapi/api'
import { mapImageMediaFile } from '@/shared/lib/mappers/strapi'
import { anyQuestionMapper } from '@/widgets/AnyQuestions'
import { footerMapper } from '@/widgets/Footer'
import { headerMapper } from '@/widgets/Header'

export type TServerSideProps = TNewsScreenProps

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async ({
    query,
    locale,
}) => {
    const page = Number(query.page) || 1
    const api = getApi(locale)

    const [config, header, newsPage, { news, pagination }, products, anyQuestions, footer] =
        await Promise.all([
            api.fetchConfig(),
            api.fetchHeader(),
            api.fetchNewsPage(),
            api.fetchNews(page),
            api.fetchProducts(),
            api.fetchAnyQuestions(),
            api.fetchFooter(),
        ])

    if (pagination.page && pagination.page > 1 && pagination.page > pagination.pageCount) {
        return {
            redirect: {
                permanent: false,
                destination: `/${locale}/news`,
            },
            props: {},
        }
    }

    const anyQuestionsData = anyQuestionMapper.toDomain(anyQuestions, products)
    const footerData = footerMapper.toDomain(footer, products)
    const headerData = headerMapper.toDomain(header)
    const headingSectionData = {
        title: newsPage?.title || '',
        description: newsPage?.description || '',
    }

    const articlesList: TNewsScreenData['articlesListData']['articles'] =
        news?.map((article) => {
            const baseUrl = !!article.event ? 'webinar' : 'news'

            return {
                title: article.title || '',
                topic: article.topic || '',
                date: article.published && article.published,
                image: mapImageMediaFile(article.previewImage),
                href: `/${baseUrl}/${article.slug}` || '/',
            }
        }) || []

    return {
        props: {
            seo: config?.seo || {},
            headerData,
            footerData,
            anyQuestions: anyQuestionsData,
            headingSectionData,
            articlesListData: { articles: articlesList, pagination: pagination },
        },
    }
}

export default function News(props: TServerSideProps) {
    return (
        <NewsScreen
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            headingSectionData={props.headingSectionData}
            articlesListData={props.articlesListData}
            anyQuestions={props.anyQuestions}
        />
    )
}
