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
    fetchFooter,
} from '@/utils/adminApi'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
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
    footer?: GetAttributesValues<'api::footer.footer'>
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async () => {
    const [
        config,
        products,
        clients,
        { news },
        header,
        { articles },
        mainPage,
        anyQuestions,
        footer,
    ] = await Promise.all([
        fetchConfig(),
        fetchProducts(),
        fetchClients(),
        fetchNews(),
        fetchHeader(),
        fetchArticles(),
        fetchMainPage(),
        fetchAnyQuestions(),
        fetchFooter(),
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
            footer,
        },
    }
}

type TProps = TServerSideProps

export default function Home(props: TProps) {
    const { headingBlock, blocks, contactsAnchorText } = mapMainPageServerData({
        mainPage: props.mainPage,
        clients: props.clients || [],
        products: props.products || [],
        articles: props.articles || [],
        news: props.news || [],
    })

    const anyQuestionsData = mapAnyQuestionsServerData(props.anyQuestions, props.products)
    const footerData = mapFooterServerData(props.footer, props.products)

    return (
        <HomePage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            footerData={footerData}
            headingBlock={headingBlock}
            blocks={blocks}
            anyQuestionsData={anyQuestionsData}
            contactsAnchorText={contactsAnchorText}
        />
    )
}
