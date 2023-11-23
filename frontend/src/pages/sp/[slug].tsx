import { GetServerSideProps } from 'next'

import { SpecialScreen, TSpecialScreenProps } from '@/screens/special'
import { getApi } from '@/shared/lib/adminApi'
import { getPublicationStateFromQuery } from '@/shared/lib/publicationState'
import { mapAnyQuestionsServerData } from '@/shared/lib/serverDataMappers/anyQuestions'
import { mapSpecialPageServerData } from '@/shared/lib/serverDataMappers/special'

export type TServerSideProps = TSpecialScreenProps

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
        <SpecialScreen
            seo={props.seo}
            specialPageData={props.specialPageData}
            anyQuestionsData={props.anyQuestionsData}
        />
    )
}
