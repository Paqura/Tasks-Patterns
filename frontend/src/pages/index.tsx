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
    fetchAnyQuestions,
    fetchFooter,
} from '@/utils/adminApi'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'
import { mapMainPageServerData } from '@/utils/serverDataMappers/home'

export type TServerSideProps = THomePageData

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

    const anyQuestionsData = mapAnyQuestionsServerData(anyQuestions, products)
    const footerData = mapFooterServerData(footer, products)
    const headerData = mapHeaderServerData(header)
    const { headingBlock, blocks, contactsAnchorText } = mapMainPageServerData({
        mainPage: mainPage,
        clients: clients || [],
        products: products || [],
        articles: articles || [],
        news: news || [],
    })

    return {
        props: {
            seo: config?.seo || {},
            headerData,
            footerData,
            headingBlock,
            anyQuestionsData,
            blocks,
            contactsAnchorText,
        },
    }
}

type TProps = TServerSideProps

export default function Home(props: TProps) {
    return (
        <HomePage
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            headingBlock={props.headingBlock}
            blocks={props.blocks}
            anyQuestionsData={props.anyQuestionsData}
            contactsAnchorText={props.contactsAnchorText}
        />
    )
}
