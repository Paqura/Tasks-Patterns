import React from 'react'

import { NewsCard, TNews } from '@/components/HomePage/components/News/components/NewsCard'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'

import styles from './index.module.scss'

const title = 'Events & News'
const description =
    'Stay up-to-date with the latest news and events in&#160;the cybersecurity industry with&#160;us. From webinars and training sessions to&#160;conferences and hackathons, we&#146;ve got you covered with all the latest happenings in&#160;the cybersecurity space.'

export type TNewsBlockData = {
    news: TNews[]
}

type TProps = TNewsBlockData

export const News: React.FC<TProps> = ({ news }) => {
    return (
        <PageSectionCard sectionId="news">
            <PageSectionCardHeader title={title} description={description} />
            <div className={styles.newsList}>
                {news.map((newsItem, index) => (
                    <NewsCard key={index} {...newsItem} />
                ))}
            </div>
        </PageSectionCard>
    )
}
