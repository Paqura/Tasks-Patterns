import { GetServerSideProps } from 'next'

import { HomeScreen, THomeScreenProps, homeMapper } from '@/screens/home'
import { getApi } from '@/services/strapi/api'
import { anyQuestionMapper } from '@/widgets/AnyQuestions'
import { footerMapper } from '@/widgets/Footer'
import { headerMapper } from '@/widgets/Header'

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

    const anyQuestionsData = anyQuestionMapper.toDomain(anyQuestions, products)
    const footerData = footerMapper.toDomain(footer, products)
    const headerData = headerMapper.toDomain(header)
    const { headingBlock, blocks, contactsAnchorText } = homeMapper.toDomain({
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
