import { GetServerSideProps } from 'next'

import {
    AnalyticArticleScreen,
    TAnalyticArticleScreenProps,
    analyticMapper,
} from '@/screens/analyticArticle'
import { getApi } from '@/services/strapi/api'
import { getPublicationStateFromQuery } from '@/shared/lib/publicationState'
import { anyQuestionMapper } from '@/widgets/AnyQuestions'
import { footerMapper } from '@/widgets/Footer'
import { headerMapper } from '@/widgets/Header'

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
            headerData: headerMapper.toDomain(header),
            footerData: footerMapper.toDomain(footer, products),
            analyticArticleData: analyticMapper.toDomain(article),
            anyQuestionsData: anyQuestionMapper.toDomain(anyQuestions, products),
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
