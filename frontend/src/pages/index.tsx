import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { HomePage } from '@/components/HomePage'
import {
    fetchArticles,
    fetchClients,
    fetchConfig,
    fetchMainPage,
    fetchNews,
    fetchHeader,
    fetchProducts,
    fetchAnyQuestions,
} from '@/utils/adminApi'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapMainPageServerData } from '@/utils/serverDataMappers/home'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    products?: GetAttributesValues<'api::product.product'>[]
    clients?: GetAttributesValues<'api::client.client'>[]
    news?: GetAttributesValues<'api::news-item.news-item'>[]
    header?: GetAttributesValues<'api::header.header'>
    articles?: GetAttributesValues<'api::analytic-article.analytic-article'>[]
    mainPage?: GetAttributesValues<'api::main-page.main-page'>
    anyQuestions?: GetAttributesValues<'api::any-question.any-question'>
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async () => {
    const [config, products, clients, { news }, header, { articles }, mainPage, anyQuestions] =
        await Promise.all([
            fetchConfig(),
            fetchProducts(),
            fetchClients(),
            fetchNews(),
            fetchHeader(),
            fetchArticles(),
            fetchMainPage(),
            fetchAnyQuestions(),
        ])

    return {
        props: {
            config,
            products,
            clients,
            news,
            header,
            articles,
            mainPage,
            anyQuestions,
        },
    }
}

type TProps = TServerSideProps

export default function Home(props: TProps) {
    const { headingBlock, blocks } = mapMainPageServerData({
        mainPage: props.mainPage,
        clients: props.clients || [],
        products: props.products || [],
        articles: props.articles || [],
        news: props.news || [],
    })

    const anyQuestions = mapAnyQuestionsServerData(props.anyQuestions, props.products)

    return (
        <HomePage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            headingBlock={headingBlock}
            blocks={blocks}
            anyQuestions={anyQuestions}
        />
    )
}
