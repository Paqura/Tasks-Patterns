import { GetServerSideProps } from 'next'

import { HomeScreen, THomeScreenProps } from '@/screens/home'
import { getApi } from '@/shared/lib/adminApi'
import { mapAnyQuestionsServerData } from '@/shared/lib/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/shared/lib/serverDataMappers/footer'
import { mapHeaderServerData } from '@/shared/lib/serverDataMappers/header'
import { mapMainPageServerData } from '@/shared/lib/serverDataMappers/home'

export type TServerSideProps = THomeScreenProps

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async (params) => {
    const api = getApi(params.locale)

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
        api.fetchConfig(),
        api.fetchProducts(),
        api.fetchClients(),
        api.fetchNews(),
        api.fetchHeader(),
        api.fetchArticles(),
        api.fetchMainPage(),
        api.fetchAnyQuestions(),
        api.fetchFooter(),
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

export default function Home(props: TServerSideProps) {
    return (
        <HomeScreen
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
