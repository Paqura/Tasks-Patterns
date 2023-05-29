import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { AboutPage } from '@/components/AboutPage'
import { fetchHeader, fetchConfig, fetchAboutPage } from '@/utils/adminApi'
import { mapAboutPageServerData } from '@/utils/serverDataMappers/about'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    aboutPage?: GetAttributesValues<'api::about-page.about-page'>
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async () => {
    const [config, header, aboutPage] = await Promise.all([
        fetchConfig(),
        fetchHeader(),
        fetchAboutPage(),
    ])

    return {
        props: {
            config,
            header,
            aboutPage,
        },
    }
}

type TProps = TServerSideProps

export default function About(props: TProps) {
    const { headingSectionData, expertsSectionData } = mapAboutPageServerData(props.aboutPage)

    return (
        <AboutPage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            headingSectionData={headingSectionData}
            expertsSectionData={expertsSectionData}
        />
    )
}
