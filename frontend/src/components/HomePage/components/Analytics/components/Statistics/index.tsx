import cn from 'classnames'
import React from 'react'

import { Button } from '@/components/ui/Button'
import { CardsSlider } from '@/components/ui/CardsSlider'
import {
    PageSectionCardGrid,
    PageSectionCardGridRightColumn,
} from '@/components/ui/PageSectionCardGrid'
import { Text } from '@/components/ui/typography/Text'
import { scrollToContacts } from '@/utils/scrollToSection'

import { StatisticValueCard } from './components/StatisticValueCard'
import styles from './index.module.scss'

export type TStatisticsValue = {
    value: string
    title: string
}

export type TStatistics = {
    first: TStatisticsValue
    second: TStatisticsValue
    third: TStatisticsValue
    fourth: TStatisticsValue
    fifth: TStatisticsValue
}

type TProps = {
    statistics: TStatistics
}

const title = 'Summary statistics for 2022'
const description =
    'Our software is&nbsp;designed to&nbsp;provide the highest level of&nbsp;protection while minimizing disruption to&nbsp;your business. We&nbsp;use the latest technology and techniques to&nbsp;stay ahead of&nbsp;the ever-evolving threat landscape. And with years of&nbsp;experience working with businesses of&nbsp;all sizes and in&nbsp;all industries, our team of&nbsp;experts has the knowledge and expertise to&nbsp;keep your organization secure.'

const contactUsText =
    'Contact&nbsp;us today to&nbsp;learn more about our cybersecurity solutions and how we&nbsp;can help protect your business.'

export const Statistics: React.FC<TProps> = ({ statistics }) => {
    return (
        <div className={styles.block}>
            <Text type="postscript">{title}</Text>
            <CardsSlider hideControls scrollAreaClassName={styles.cardsScrollArea}>
                <ul className={styles.values}>
                    <li className={cn(styles.value, styles.value_big)}>
                        <StatisticValueCard {...statistics.first} />
                    </li>
                    <li className={styles.value}>
                        <StatisticValueCard {...statistics.second} />
                    </li>
                    <li className={styles.value}>
                        <StatisticValueCard {...statistics.third} />
                    </li>
                    <li className={styles.value}>
                        <StatisticValueCard {...statistics.fourth} />
                    </li>
                    <li className={styles.value}>
                        <StatisticValueCard {...statistics.fifth} />
                    </li>
                </ul>
            </CardsSlider>
            <PageSectionCardGrid>
                <PageSectionCardGridRightColumn className={styles.description}>
                    <Text type="pL">{description}</Text>
                </PageSectionCardGridRightColumn>
            </PageSectionCardGrid>
            <PageSectionCardGrid>
                <PageSectionCardGridRightColumn className={styles.contactUsText}>
                    <Text type="pL">{contactUsText}</Text>
                    <Button onClick={scrollToContacts} className={styles.contactBtn}>
                        Contact us
                    </Button>
                </PageSectionCardGridRightColumn>
            </PageSectionCardGrid>
        </div>
    )
}
