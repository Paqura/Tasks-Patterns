import DOMPurify from 'dompurify'
import { marked } from 'marked'

import { TNewsArticleData } from '@/utils/serverDataMappers/news-article'

export type TNewsArticlePageData = {
    newsArticleData: TNewsArticleData
}
type TNewsArticlePageProps = TNewsArticlePageData
export default function NewsArticle(props: TNewsArticlePageProps) {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked.parse(props.newsArticleData.articleText)),
            }}
        />
    )
}
