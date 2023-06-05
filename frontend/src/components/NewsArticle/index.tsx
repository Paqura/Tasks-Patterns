import React from 'react'

import { MarkdownContent } from '@/components/ui/MarkdownContent'
import { TNewsArticleData } from '@/utils/serverDataMappers/news-article'

import styles from './index.module.scss'

export type TNewsArticlePageData = {
    newsArticleData: TNewsArticleData
}

type TNewsArticlePageProps = TNewsArticlePageData

export default function NewsArticle(props: TNewsArticlePageProps) {
    return (
        <MarkdownContent className={styles.content}>
            {props.newsArticleData.content}
        </MarkdownContent>
    )
}
