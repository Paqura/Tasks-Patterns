import Image from 'next/image'
import React from 'react'

import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'
import { TWithSectionParams } from '@/types'

import { Articles, TAnalyticArticlesData } from './components/Articles'
import { Statistics, TStatisticsData } from './components/Statistics'
import styles from './index.module.scss'

import backgroundIcon from '/public/images/backgrounds/analytics-background.svg'

export type TAnalyticBlocksData = TWithSectionParams<{
    articles: TAnalyticArticlesData
    statistics: TStatisticsData
}>

type TProps = {
    number: number
    data: TAnalyticBlocksData
}

export const Analytics: React.FC<TProps> = ({ data, number }) => {
    const { title, description, sectionId, articles, statistics } = data
    return (
        <PageSectionCard mode="light" className={styles.block} sectionId={sectionId}>
            <PageSectionCardHeader title={title} description={description} number={number} />
            <div className={styles.articlesList}>
                <Image src={backgroundIcon} alt="" className={styles.background} />
                <Articles data={articles} />
            </div>
            <div className={styles.statisticsList}>
                <Statistics data={statistics} />
            </div>
        </PageSectionCard>
    )
}
