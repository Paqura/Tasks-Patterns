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

type TProps = {
    articles: TArticle[]
}

export const Articles: React.FC<TProps> = ({ articles }) => {
    const showedArticles = articles.slice(0, 3)

    return (
        <PageSectionCardGrid className={styles.block}>
            <PageSectionCardGridRightColumn>
                <div className={styles.header}>
                    <Heading level={3}>Analytical articles</Heading>
                    <Link type="s" href="/analytics">
                        All articles
                    </Link>
                </div>
                <CardsSlider hideControls scrollAreaClassName={styles.listScrollArea}>
                    <ul className={styles.list}>
                        {showedArticles.map((article, index) => (
                            <li key={index} className={styles.listItem}>
                                <ArticleCard {...article} />
                            </li>
                        ))}
                        {showedArticles.map((article, index) => (
                            <li key={index} className={styles.listItem}>
                                <ArticleCard {...article} />
                            </li>
                        ))}
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
