import Image from 'next/image'
import React from 'react'

import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'

import { Articles, TArticle } from './components/Articles'
import { Statistics } from './components/Statistics'
import styles from './index.module.scss'

import backgroundIcon from '/public/images/backgrounds/analytics-background.svg'

const title = 'Analytics?'
const description = `Our team of&nbsp;experts stays up-to-date on&nbsp;the latest threats and trends in&nbsp;the industry, and we&rsquo;re always looking for ways to&nbsp;improve our solutions and services.`

export type TAnalyticsBlockData = {
    articles: TArticle[]
}

type TProps = TAnalyticsBlockData

const stats = {
    first: { title: '1 value description', value: '1000' },
    second: { title: '2 value description', value: '1000' },
    third: { title: '3 2022 Revenue Growth', value: '1000' },
    fourth: { title: '4 value description', value: '1000' },
    fifth: { title: '5 value description', value: '1000' },
}

export const Analytics: React.FC<TProps> = ({ articles }) => {
    return (
        <PageSectionCard mode="light" className={styles.block} sectionId="analytics">
            <PageSectionCardHeader title={title} description={description} />
            <div className={styles.articlesList}>
                <Image src={backgroundIcon} alt="" className={styles.background} />
                <Articles articles={articles} />
            </div>
            <div className={styles.statisticsList}>
                <Statistics statistics={stats} />
            </div>
        </PageSectionCard>
    )
}
