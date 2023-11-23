import { GetServerSideProps } from 'next'

import { AnalyticArticleScreen, TAnalyticArticleScreenProps } from '@/screens/analyticArticle'
import { getApi } from '@/shared/lib/adminApi'
import { getPublicationStateFromQuery } from '@/shared/lib/publicationState'
import { mapArticleServerData } from '@/shared/lib/serverDataMappers/analytic-article'
import { mapAnyQuestionsServerData } from '@/shared/lib/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/shared/lib/serverDataMappers/footer'
import { mapHeaderServerData } from '@/shared/lib/serverDataMappers/header'

export type TServerSideProps = TAnalyticArticleScreenProps

export const getServerSideProps: GetServerSideProps<TServerSideProps, { slug: string }> = async ({
    params,
    locale,
    query,
}) => {
    if (!params?.slug) {
        return {
            notFound: true,
        }
    }

    const api = getApi(locale)

    const [article, config, header, footer, anyQuestions, products] = await Promise.all([
        api.fetchAnalyticArticle(params.slug, getPublicationStateFromQuery(query)),
        api.fetchConfig(),
        api.fetchHeader(),
        api.fetchFooter(),
        api.fetchAnyQuestions(),
        api.fetchProducts(),
    ])

    if (!article) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            seo: config?.seo || {},
            headerData: mapHeaderServerData(header),
            footerData: mapFooterServerData(footer, products),
            analyticArticleData: mapArticleServerData(article),
            anyQuestionsData: mapAnyQuestionsServerData(anyQuestions, products),
        },
    }
}

export default function AnalyticalArticle(props: TServerSideProps) {
    return (
        <AnalyticArticleScreen
            analyticArticleData={props.analyticArticleData}
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            anyQuestionsData={props.anyQuestionsData}
        />
    )
}
