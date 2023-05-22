import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { HomePage, THomePageData } from '@/components/HomePage'
import {
    fetchArticles,
    fetchClients,
    fetchConfig,
    fetchMainPage,
    fetchNews,
    fetchHeader,
    fetchProducts,
} from '@/utils/adminApi'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapImageMediaFile, mapVideoMediaFile } from '@/utils/serverDataMappers/media'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    products?: GetAttributesValues<'api::product.product'>[]
    clients?: GetAttributesValues<'api::client.client'>[]
    news?: GetAttributesValues<'api::news-item.news-item'>[]
    header?: GetAttributesValues<'api::header.header'>
    articles?: GetAttributesValues<'api::analytic-article.analytic-article'>[]
    mainPage?: GetAttributesValues<'api::main-page.main-page'>
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async () => {
    const [config, products, clients, { news }, header, { articles }, mainPage] = await Promise.all(
        [
            fetchConfig(),
            fetchProducts(),
            fetchClients(),
            fetchNews(),
            fetchHeader(),
            fetchArticles(),
            fetchMainPage(),
        ]
    )

    return {
        props: {
            config,
            products,
            clients,
            news,
            header,
            articles,
            mainPage,
        },
    }
}

type TProps = TServerSideProps

export default function Home(props: TProps) {
    const products: THomePageData['productsBlock']['products'] =
        props.products?.map((product) => ({
            title: product.title || '',
            description: product.subtitle,
            icon: mapImageMediaFile(product.icon),
            href: product.slug || '',
        })) || []

    const clients: THomePageData['productsBlock']['clients'] =
        props.clients?.map((client) => ({
            name: client.name || '',
            logo: mapImageMediaFile(client.logo),
        })) || []

    const news: THomePageData['newsBlock']['news'] =
        props.news?.map((newsItem) => ({
            title: newsItem.title || '',
            href: newsItem.link || '/',
            image: mapImageMediaFile(newsItem.previewImage),
            date: newsItem.published,
        })) || []

    const articles: THomePageData['analyticsBlock']['articles'] =
        props.articles?.map((article) => {
            return {
                title: article.title || '',
                tag: article.tag,
                date: article.published && new Date(article.published),
                href: article.link || '/',
            }
        }) || []

    const headerData: THomePageData['header'] = mapHeaderServerData(props.header)

    const statistics: THomePageData['analyticsBlock']['statistics'] = {
        first: {
            title: props.mainPage?.statistics?.first?.title || '',
            value: props.mainPage?.statistics?.first?.value || '',
        },
        second: {
            title: props.mainPage?.statistics?.second?.title || '',
            value: props.mainPage?.statistics?.second?.value || '',
        },
        third: {
            title: props.mainPage?.statistics?.third?.title || '',
            value: props.mainPage?.statistics?.third?.value || '',
        },
        fourth: {
            title: props.mainPage?.statistics?.fourth?.title || '',
            value: props.mainPage?.statistics?.fourth?.value || '',
        },
        fifth: {
            title: props.mainPage?.statistics?.fifth?.title || '',
            value: props.mainPage?.statistics?.fifth?.value || '',
        },
    }

    const heading: THomePageData['headingBlock'] = {
        video: mapVideoMediaFile(props.mainPage?.headingVideo),
        title: props.mainPage?.title || '',
        subtitle: props.mainPage?.subtitle,
    }

    return (
        <HomePage
            seo={props.config?.seo || {}}
            productsBlock={{ products, clients }}
            analyticsBlock={{ articles, statistics }}
            newsBlock={{ news }}
            header={headerData}
            headingBlock={heading}
        />
    )
}
