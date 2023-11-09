import { GetServerSideProps } from 'next'

import { SpecialPage, TSpecialPageProps } from '@/components/SpecialPage'
import { getApi } from '@/utils/adminApi'
import { getPublicationStateFromQuery } from '@/utils/publicationState'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapSpecialPageServerData } from '@/utils/serverDataMappers/special'

export type TServerSideProps = TSpecialPageProps

export const getServerSideProps: GetServerSideProps<TServerSideProps, { slug: string }> = async ({
    locale,
    params,
    query,
}) => {
    if (!params?.slug) {
        return {
            notFound: true,
        }
    }

    const api = getApi(locale)

    const [config, allProducts, anyQuestions, specialData] = await Promise.all([
        api.fetchConfig(),
        api.fetchProducts(),
        api.fetchAnyQuestions(),
        api.fetchSpecialPage(params.slug, getPublicationStateFromQuery(query)),
    ])

    if (specialData == null)
        return {
            notFound: true,
        }

    const anyQuestionsData = mapAnyQuestionsServerData(anyQuestions, allProducts)

    return {
        props: {
            seo: config?.seo || {},

            specialPageData: mapSpecialPageServerData(specialData),
            internalError: false,
            anyQuestionsData,
        },
    }
}

export default function Special(props: TServerSideProps) {
    return (
        <SpecialPage
            seo={props.seo}
            specialPageData={props.specialPageData}
            anyQuestionsData={props.anyQuestionsData}
        />
    )
}
