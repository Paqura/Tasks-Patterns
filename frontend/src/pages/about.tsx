import { GetServerSideProps } from 'next'

import { AboutScreen, TAboutScreenData, aboutMapper } from '@/screens/about'
import { getApi } from '@/services/strapi/api'
import { anyQuestionMapper } from '@/widgets/AnyQuestions'
import { footerMapper } from '@/widgets/Footer'
import { headerMapper } from '@/widgets/Header'

export type TServerSideProps = TAboutScreenData

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async (params) => {
    const api = getApi(params.locale)

    const [config, header, aboutPage, products, anyQuestions, footer] = await Promise.all([
        api.fetchConfig(),
        api.fetchHeader(),
        api.fetchAboutPage(),
        api.fetchProducts(),
        api.fetchAnyQuestions(),
        api.fetchFooter(),
    ])
    const anyQuestionsData = anyQuestionMapper.toDomain(anyQuestions, products)
    const footerData = footerMapper.toDomain(footer, products)
    const headerData = headerMapper.toDomain(header)

    const { headingSectionData, expertsSectionData, historySectionData } =
        aboutMapper.toDomain(aboutPage)

    return {
        props: {
            seo: config?.seo || {},
            headerData,
            headingSectionData,
            expertsSectionData,
            historySectionData,
            anyQuestions: anyQuestionsData,
            footerData,
        },
    }
}

type TProps = TServerSideProps

export default function About(props: TProps) {
    return (
        <AboutScreen
            seo={props.seo}
            headerData={props.headerData}
            headingSectionData={props.headingSectionData}
            expertsSectionData={props.expertsSectionData}
            historySectionData={props.historySectionData}
            anyQuestions={props.anyQuestions}
            footerData={props.footerData}
        />
    )
}
