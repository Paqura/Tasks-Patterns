import { CardsSlider } from '@/shared/ui/common/CardsSlider'
import { Link } from '@/shared/ui/common/Link'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'
import { ArticleCard } from './ui/ArticleCard'

export type TArticle = {
    title: string
    href: string
    tag?: string
    date?: Date
}

export type TAnalyticArticlesData = {
    title: string
    allArticlesLinkText: string
    articles: TArticle[]
}

type TArticlesProps = {
    data: TAnalyticArticlesData
}

export const Articles = ({ data }: TArticlesProps) => {
    const { articles, title, allArticlesLinkText } = data

    const showedArticles = articles.slice(0, 3)

    return (
        <PageSection.Grid className={styles.block}>
            <PageSection.RightColumn>
                <div className={styles.header}>
                    <Heading level={3}>{title}</Heading>
                    <Link type="s" href="/analytics">
                        {allArticlesLinkText}
                    </Link>
                </div>

                <CardsSlider hideControls scrollAreaClassName={styles.listScrollArea}>
                    <ul className={styles.list}>
                        {showedArticles.map((article, index) => (
                            <li key={index} className={styles.listItem}>
                                <ArticleCard {...article} />
                            </li>
                        ))}
                    </ul>
                </CardsSlider>
            </PageSection.RightColumn>
        </PageSection.Grid>
    )
}
