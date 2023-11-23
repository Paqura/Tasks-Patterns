import { GetServerSideProps } from 'next'

import { NewsArticleScreen, TNewsArticleScreenProps } from '@/screens/newsArticle'
import { getApi } from '@/shared/lib/adminApi'
import { getPublicationStateFromQuery } from '@/shared/lib/publicationState'
import { mapAnyQuestionsServerData } from '@/shared/lib/serverDataMappers/anyQuestions'
import { mapFooterServerData } from '@/shared/lib/serverDataMappers/footer'
import { mapHeaderServerData } from '@/shared/lib/serverDataMappers/header'
import { mapNewsArticleServerData } from '@/shared/lib/serverDataMappers/news-article'

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

    const anyQuestionsData = mapAnyQuestionsServerData(anyQuestions, products)
    const footerData = mapFooterServerData(footer, products)
    const headerData = mapHeaderServerData(header)
    const newsArticleData = mapNewsArticleServerData(newsItem)

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
