import { PageSection } from '../PageSection'

import { Article, TArticlePreviewData } from './ui/Article'
import { Pagination, TPaginationData } from './ui/Pagination'

export type TArticlesListData = {
    articles: TArticlePreviewData[]
    pagination: TPaginationData
}

export type TArticlesListProps = {
    data: TArticlesListData
    withImage?: boolean
}

export const ArticlesList = ({ data, withImage }: TArticlesListProps) => {
    return (
        <PageSection.Card mode="light">
            {data.articles.map(({ title, topic, date, image, href }) => (
                <Article
                    key={title}
                    title={title}
                    topic={topic}
                    date={date}
                    image={image}
                    href={href}
                    withImage={withImage}
                />
            ))}

            <Pagination page={data.pagination.page} pageCount={data.pagination.pageCount} />
        </PageSection.Card>
    )
}
