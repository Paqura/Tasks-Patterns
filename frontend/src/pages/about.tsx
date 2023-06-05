import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { AboutPage } from '@/components/AboutPage'
import {
    fetchHeader,
    fetchConfig,
    fetchAboutPage,
    fetchProducts,
    fetchAnyQuestions,
} from '@/utils/adminApi'
import { mapAboutPageServerData } from '@/utils/serverDataMappers/about'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    aboutPage?: GetAttributesValues<'api::about-page.about-page'>
    products?: GetAttributesValues<'api::product.product'>[]
    anyQuestions?: GetAttributesValues<'api::any-question.any-question'>
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async () => {
    const [config, header, aboutPage, products, anyQuestions] = await Promise.all([
        fetchConfig(),
        fetchHeader(),
        fetchAboutPage(),
        fetchProducts(),
        fetchAnyQuestions(),
    ])

    return {
        props: {
            config,
            header,
            aboutPage,
            products,
            anyQuestions,
        },
    }
}

type TProps = TServerSideProps

export default function About(props: TProps) {
    const { headingSectionData, expertsSectionData, historySectionData } = mapAboutPageServerData(
        props.aboutPage
    )

    const anyQuestions = mapAnyQuestionsServerData(props.anyQuestions, props.products)

    return (
        <AboutPage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            headingSectionData={headingSectionData}
            expertsSectionData={expertsSectionData}
            historySectionData={historySectionData}
            anyQuestions={anyQuestions}
        />
    )
}
