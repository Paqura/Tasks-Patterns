import { GetServerSideProps } from 'next'

import { SpecialScreen, TSpecialScreenProps, specialMapper } from '@/screens/special'
import { getApi } from '@/services/strapi/api'
import { getPublicationStateFromQuery } from '@/shared/lib/publicationState'
import { anyQuestionMapper } from '@/widgets/AnyQuestions'

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

    return {
        props: {
            seo: config?.seo || {},

            specialPageData: specialMapper.toDomain(specialData),
            internalError: false,
            anyQuestionsData: anyQuestionMapper.toDomain(anyQuestions, allProducts),
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
