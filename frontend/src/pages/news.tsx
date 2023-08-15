import { GetServerSideProps } from 'next'

import { NewsPage, TNewsPageData } from '@/components/NewsPage'
import { getApi } from '@/utils/adminApi'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

export type TServerSideProps = TNewsPageData

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

    const anyQuestionsData = mapAnyQuestionsServerData(anyQuestions, products)
    const footerData = mapFooterServerData(footer, products)
    const headerData = mapHeaderServerData(header)
    const headingSectionData = {
        title: newsPage?.title || '',
        description: newsPage?.description || '',
    }

    const articlesList: TNewsPageData['articlesListData']['articles'] =
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

type TProps = TServerSideProps

export default function News(props: TProps) {
    return (
        <NewsPage
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            headingSectionData={props.headingSectionData}
            articlesListData={props.articlesListData}
            anyQuestions={props.anyQuestions}
        />
    )
}
