import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { THeaderData } from '@/components/Header'
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
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

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
    const config = await fetchConfig()
    const products = await fetchProducts()
    const clients = await fetchClients()
    const news = await fetchNews()
    const header = await fetchHeader()
    const articles = await fetchArticles()
    const mainPage = await fetchMainPage()

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
    const products: THomePageData['products'] =
        props.products?.map((product) => ({
            title: product.title || '',
            description: product.subtitle,
            icon: mapImageMediaFile(product.icon),
            href: product.link || '/',
        })) || []

    const clients: THomePageData['clients'] =
        props.clients?.map((client) => ({
            name: client.name || '',
            logo: mapImageMediaFile(client.logo),
        })) || []

    const news: THomePageData['news'] =
        props.news?.map((newsItem) => ({
            description: newsItem.description || '',
            href: newsItem.link || '/',
            image: mapImageMediaFile(newsItem.image),
            date: newsItem.published,
        })) || []

    const articles: THomePageData['articles'] =
        props.articles?.map((article) => {
            return {
                title: article.title || '',
                tag: article.tag,
                date: article.published && new Date(article.published),
                href: article.link || '/',
            }
        }) || []

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

    const statistics = {
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

    return (
        <HomePage
            seo={props.config?.seo || {}}
            products={products}
            clients={clients}
            articles={articles}
            news={news}
            navItems={navItems}
            statistics={statistics}
        />
    )
}
