import { GetServerSideProps } from 'next'

import { GitexPage, TGitexPageProps } from '@/components/GitexPage'
import { getApi } from '@/utils/adminApi'
import { mapAnyQuestionsServerData } from '@/utils/serverDataMappers/anyQuestions'
import { mapGitexServerData } from '@/utils/serverDataMappers/gitex'

export type TServerSideProps = TGitexPageProps

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async ({ locale }) => {
    const api = getApi(locale)

    const [config, allProducts, anyQuestions, gitexData] = await Promise.all([
        api.fetchConfig(),
        api.fetchProducts(),
        api.fetchAnyQuestions(),
        api.fetchGtex(),
    ])

    if (gitexData == null)
        return {
            notFound: true,
        }

    const anyQuestionsData = mapAnyQuestionsServerData(anyQuestions, allProducts)

    return {
        props: {
            seo: config?.seo || {},
            anyQuestionsData,

            gitexData: mapGitexServerData(gitexData),
            internalError: false,
        },
    }
}

type TProps = TServerSideProps

export default function Event(props: TProps) {
    return (
        <GitexPage
            seo={props.seo}
            gitexData={props.gitexData}
            anyQuestionsData={props.anyQuestionsData}
        />
    )
}
