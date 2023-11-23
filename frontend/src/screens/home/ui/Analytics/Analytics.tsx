import Image from 'next/image'

import { PageSection } from '@/shared/ui/project/PageSection'
import { TWithSectionParams } from '@/types'

import styles from './index.module.scss'
import { Articles, TAnalyticArticlesData } from './ui/Articles'
import { Statistics, TStatisticsData } from './ui/Statistics'

import backgroundIcon from '/public/images/backgrounds/analytics-background.svg'

export type TAnalyticBlocksData = TWithSectionParams<{
    articles: TAnalyticArticlesData
    statistics: TStatisticsData
}>

type TAnalyticsProps = {
    number: number
    data: TAnalyticBlocksData
}

export const Analytics = ({ data, number }: TAnalyticsProps) => {
    const { title, description, sectionId, articles, statistics } = data

    return (
        <PageSection.Card mode="light" sectionId={sectionId}>
            <PageSection.Header title={title} description={description} number={number} />

            <div className={styles.articlesList}>
                <Image src={backgroundIcon} alt="" className={styles.background} />
                <Articles data={articles} />
            </div>

            <div className={styles.statisticsList}>
                <Statistics data={statistics} />
            </div>
        </PageSection.Card>
    )
}
