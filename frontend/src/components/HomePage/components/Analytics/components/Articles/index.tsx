import React from 'react'

import { CardsSlider } from '@/components/ui/CardsSlider'
import { Link } from '@/components/ui/Link'
import {
    PageSectionCardGrid,
    PageSectionCardGridRightColumn,
} from '@/components/ui/PageSectionCardGrid'
import { Heading } from '@/components/ui/typography/Heading'

import { ArticleCard } from './components/ArticleCard'
import styles from './index.module.scss'

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

type TProps = {
    data: TAnalyticArticlesData
}

export const Articles: React.FC<TProps> = ({ data }) => {
    const { articles, title, allArticlesLinkText } = data
    const showedArticles = articles.slice(0, 3)

    return (
        <PageSectionCardGrid className={styles.block}>
            <PageSectionCardGridRightColumn>
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
            </PageSectionCardGridRightColumn>
        </PageSectionCardGrid>
    )
}
