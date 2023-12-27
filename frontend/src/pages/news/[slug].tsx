import { GetServerSideProps } from 'next'

import {
    NewsArticleScreen,
    TNewsArticleScreenProps,
    newsArticleMapper,
} from '@/screens/newsArticle'
import { getApi } from '@/services/strapi/api'
import { getPublicationStateFromQuery } from '@/shared/lib/publicationState'
import { anyQuestionMapper } from '@/widgets/AnyQuestions'
import { footerMapper } from '@/widgets/Footer'
import { headerMapper } from '@/widgets/Header'

export type TServerSideProps = TNewsArticleScreenProps

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

    const [newsItem, config, header, products, anyQuestions, footer] = await Promise.all([
        api.fetchNewsArticle(params.slug, getPublicationStateFromQuery(query)),
        api.fetchConfig(),
        api.fetchHeader(),
        api.fetchProducts(),
        api.fetchAnyQuestions(),
        api.fetchFooter(),
    ])

    if (!newsItem) {
        return {
            notFound: true,
        }
    }
    if (!!newsItem?.event) {
        return {
            redirect: {
                destination: `${locale}/webinar/${params.slug}`,
                permanent: true,
            },
        }
    }

    const anyQuestionsData = anyQuestionMapper.toDomain(anyQuestions, products)
    const footerData = footerMapper.toDomain(footer, products)
    const headerData = headerMapper.toDomain(header)
    const newsArticleData = newsArticleMapper.toDomain(newsItem)

    return {
        props: {
            seo: config?.seo || {},
            headerData,
            footerData,
            newsArticleData,
            anyQuestionsData,
        },
    }
}
type TProps = TServerSideProps

export default function NewsArticleItem(props: TProps) {
    return (
        <NewsArticleScreen
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            newsArticleData={props.newsArticleData}
            anyQuestionsData={props.anyQuestionsData}
        />
    )
}
