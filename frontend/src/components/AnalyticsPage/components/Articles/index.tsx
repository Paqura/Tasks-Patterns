import { PageSectionCard } from '@/components/ui/PageSectionCard'

import { Article, TArticleData } from './components/Article'
import { Pagination, TPaginationData } from './components/Pagination'

export type TArticlesData = {
    articles: TArticleData[]
    pagination: TPaginationData
}

type TArticlesProps = TArticlesData

export const Articles: React.FC<TArticlesProps> = ({ articles, pagination }) => {
    return (
        <PageSectionCard mode="light">
            {articles.map(({ title, description, date, href }) => (
                <Article
                    key={title}
                    title={title}
                    description={description}
                    date={date}
                    href={href}
                />
            ))}

            <Pagination page={pagination.page} pageCount={pagination.pageCount} />
        </PageSectionCard>
    )
}
