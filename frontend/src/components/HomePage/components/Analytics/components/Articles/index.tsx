import React from 'react'

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
                <Heading level={3}>Analytical articles</Heading>
                <ul className={styles.list}>
                    {showedArticles.map((article, index) => (
                        <li key={index} className={styles.listItem}>
                            <ArticleCard {...article} />
                        </li>
                    ))}
                </ul>
            </PageSectionCardGridRightColumn>
        </PageSectionCardGrid>
    )
}
