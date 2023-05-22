import { GetAttributesValues, CollectionMetadata } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { THeaderData } from '@/components/Header'
import { NewsPage, TNewsPageData } from '@/components/NewsPage'
import { fetchHeader, fetchConfig, fetchNews, fetchNewsPage } from '@/utils/adminApi'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    newsPage?: GetAttributesValues<'api::news-page.news-page'>
    news?: GetAttributesValues<'api::news-item.news-item'>[]
    pagination: CollectionMetadata['pagination']
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async ({ query }) => {
    const page = Number(query.page) || 1

    const [config, header, newsPage, { news, pagination }] = await Promise.all([
        fetchConfig(),
        fetchHeader(),
        fetchNewsPage(),
        fetchNews(page),
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
        },
    }
}

type TProps = TServerSideProps

export default function News(props: TProps) {
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

    const headingSection = {
        title: props.newsPage?.title || '',
        description: props.newsPage?.description || '',
    }

    const articles: TNewsPageData['articlesListData']['articles'] =
        props.news?.map((article) => {
            return {
                title: article.title || '',
                description: article.topic || '',
                date: article.published && new Date(article.published),
                image: mapImageMediaFile(article.previewImage),
                href: article.link || '/',
            }
        }) || []

    return (
        <NewsPage
            seo={props.config?.seo || {}}
            headerData={{ navItems }}
            headingSectionData={headingSection}
            articlesListData={{ articles, pagination: props.pagination }}
        />
    )
}
