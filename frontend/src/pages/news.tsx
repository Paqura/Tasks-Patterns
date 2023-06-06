import { GetAttributesValues, CollectionMetadata } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { NewsPage, TNewsPageData } from '@/components/NewsPage'
import {
    fetchHeader,
    fetchConfig,
    fetchNews,
    fetchNewsPage,
    fetchProducts,
    fetchAnyQuestions,
    fetchFooter,
} from '@/utils/adminApi'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    newsPage?: GetAttributesValues<'api::news-page.news-page'>
    news?: GetAttributesValues<'api::news-item.news-item'>[]
    pagination: CollectionMetadata['pagination']
    products?: GetAttributesValues<'api::product.product'>[]
    anyQuestions?: GetAttributesValues<'api::any-question.any-question'>
    footer?: GetAttributesValues<'api::footer.footer'>
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async ({ query }) => {
    const page = Number(query.page) || 1

    const [config, header, newsPage, { news, pagination }, products, anyQuestions, footer] =
        await Promise.all([
            fetchConfig(),
            fetchHeader(),
            fetchNewsPage(),
            fetchNews(page),
            fetchProducts(),
            fetchAnyQuestions(),
            fetchFooter(),
        ])

    if (pagination.page > pagination.pageCount) {
        return {
            redirect: {
                permanent: false,
                destination: '/news',
            },
            props: {},
        }
    }

    return {
        props: {
            config,
            header,
            newsPage,
            news,
            pagination,
            products,
            anyQuestions,
            footer,
        },
    }
}

type TProps = TServerSideProps

export default function News(props: TProps) {
    const headingSection = {
        title: props.newsPage?.title || '',
        description: props.newsPage?.description || '',
    }

    const articles: TNewsPageData['articlesListData']['articles'] =
        props.news?.map((article) => {
            const baseUrl = article.isEvent ? 'webinar' : 'news'

            return {
                title: article.title || '',
                topic: article.topic || '',
                date: article.published && new Date(article.published),
                image: mapImageMediaFile(article.previewImage) || undefined,
                href: `/${baseUrl}/${article.slug}` || '/',
            }
        }) || []

    const anyQuestions = mapAnyQuestionsServerData(props.anyQuestions, props.products)
    const footerData = mapFooterServerData(props.footer, props.products)

    return (
        <NewsPage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            footerData={footerData}
            headingSectionData={headingSection}
            articlesListData={{ articles, pagination: props.pagination }}
            anyQuestions={anyQuestions}
        />
    )
}
