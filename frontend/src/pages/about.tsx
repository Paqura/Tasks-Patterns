import { GetServerSideProps } from 'next'

import { AboutScreen, TAboutScreenData } from '@/screens/about'
import { getApi } from '@/shared/lib/adminApi'
import { mapAboutPageServerData } from '@/shared/lib/serverDataMappers/about'
import { mapAnyQuestionsServerData } from '@/shared/lib/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/shared/lib/serverDataMappers/footer'
import { mapHeaderServerData } from '@/shared/lib/serverDataMappers/header'

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
    const anyQuestionsData = mapAnyQuestionsServerData(anyQuestions, products)
    const footerData = mapFooterServerData(footer, products)
    const headerData = mapHeaderServerData(header)

    const { headingSectionData, expertsSectionData, historySectionData } =
        mapAboutPageServerData(aboutPage)

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
