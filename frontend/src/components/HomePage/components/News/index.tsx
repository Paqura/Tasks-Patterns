import React from 'react'

import { NewsCard, TNews } from '@/components/HomePage/components/News/components/NewsCard'
import { CardsSlider } from '@/components/ui/CardsSlider'
import { Link } from '@/components/ui/Link'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'
import { TWithSectionParams } from '@/types'

import styles from './index.module.scss'

export type TNewsBlockData = TWithSectionParams<{
    allNewsLinkText: string
    news: TNews[]
}>

type TProps = {
    data: TNewsBlockData
}

export const News: React.FC<TProps> = ({ data }) => {
    const { title, description, allNewsLinkText, news } = data
    return (
        <PageSectionCard sectionId="news">
            <PageSectionCardHeader title={title} description={description} />
            <CardsSlider
                controls={
                    <Link type="s" href={'/news'}>
                        {allNewsLinkText}
                    </Link>
                }
                className={styles.newsList}
                scrollAreaClassName={styles.newsListScrollArea}
            >
                {news.map((newsItem, index) => (
                    <NewsCard key={index} {...newsItem} />
                ))}
            </CardsSlider>
        </PageSectionCard>
    )
}
