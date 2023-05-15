import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { THeaderData } from '@/components/Header'
import { HomePage, THomePageData } from '@/components/HomePage'
import { fetchClients, fetchConfig, fetchNews, fetchHeader, fetchProducts } from '@/utils/adminApi'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    products?: GetAttributesValues<'api::product.product'>[]
    clients?: GetAttributesValues<'api::client.client'>[]
    news?: GetAttributesValues<'api::news-item.news-item'>[]
    header?: GetAttributesValues<'api::header.header'>
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async () => {
    const config = await fetchConfig()
    const products = await fetchProducts()
    const clients = await fetchClients()
    const news = await fetchNews()
    const header = await fetchHeader()

    return {
        props: {
            config,
            products,
            clients,
            news,
            header,
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
        props.clients?.map((product) => ({
            name: product.name || '',
            logo: mapImageMediaFile(product.logo),
        })) || []

    const news: THomePageData['news'] =
        props.news?.map((newsItem) => ({
            description: newsItem.description || '',
            href: newsItem.link || '/',
            image: mapImageMediaFile(newsItem.image),
            date: newsItem.published,
        })) || []

    const articles: THomePageData['articles'] = [
        {
            title: 'Positive Technologies&rsquo; research addresses vulnerabilities in&nbsp;Nokia NetAct for cellular operators',
            tag: 'WEB APPLICATIONS',
            date: new Date(),
            href: 'some-article-url',
        },
        {
            title: 'Positive Technologies&rsquo; research addresses vulnerabilities in&nbsp;Nokia NetAct for cellular operators',
            tag: 'WEB APPLICATIONS',
            date: new Date(),
            href: 'some-article-url',
        },
        {
            title: 'Positive Technologies&rsquo; research addresses vulnerabilities in&nbsp;Nokia NetAct for cellular operators',
            tag: 'WEB APPLICATIONS',
            date: new Date(),
            href: 'some-article-url',
        },
    ]

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

    return (
        <HomePage
            seo={props.config?.seo || {}}
            products={products}
            clients={clients}
            articles={articles}
            news={news}
            navItems={navItems}
        />
    )
}
