import { GetServerSideProps } from 'next'

import { AboutPage, TAboutPageData } from '@/components/AboutPage'
import {
    fetchHeader,
    fetchConfig,
    fetchAboutPage,
    fetchProducts,
    fetchAnyQuestions,
    fetchFooter,
} from '@/utils/adminApi'
import { mapAboutPageServerData } from '@/utils/serverDataMappers/about'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'

export type TServerSideProps = TAboutPageData

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async () => {
    const [config, header, aboutPage, products, anyQuestions, footer] = await Promise.all([
        fetchConfig(),
        fetchHeader(),
        fetchAboutPage(),
        fetchProducts(),
        fetchAnyQuestions(),
        fetchFooter(),
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
        <AboutPage
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
