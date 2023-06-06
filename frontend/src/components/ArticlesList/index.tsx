import { PageSectionCard } from '@/components/ui/PageSectionCard'

import { Article, TArticlePreviewData } from './components/Article'
import { Pagination, TPaginationData } from './components/Pagination'

export type TArticlesListData = {
    articles: TArticlePreviewData[]
    pagination: TPaginationData
}

type TArticlesListProps = {
    data: TArticlesListData
    withImage?: boolean
}

export const ArticlesList: React.FC<TArticlesListProps> = ({ data, withImage }) => {
    return (
        <PageSectionCard mode="light">
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
        </PageSectionCard>
    )
}
