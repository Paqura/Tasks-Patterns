import cn from 'classnames'
import React from 'react'

import { Button } from '@/components/ui/Button'
import { CardsSlider } from '@/components/ui/CardsSlider'
import {
    PageSectionCardGrid,
    PageSectionCardGridRightColumn,
} from '@/components/ui/PageSectionCardGrid'
import { Text } from '@/components/ui/typography/Text'
import { TVideo } from '@/types'
import { CONTACTS_SECTION_ID } from '@/utils/constants'

import { StatisticValueCard } from './components/StatisticValueCard'
import styles from './index.module.scss'

export type TStatisticsValue = {
    value: string
    title: string
}

export type TStatisticsData = {
    title: string
    description?: string
    contactWelcomeText: string
    contactButtonText: string
    videoBackground?: TVideo
    first: TStatisticsValue
    second: TStatisticsValue
    third: TStatisticsValue
    fourth: TStatisticsValue
    fifth: TStatisticsValue
}

type TProps = {
    data: TStatisticsData
}

export const Statistics: React.FC<TProps> = ({ data }) => {
    const { title, description, contactWelcomeText, contactButtonText, videoBackground } = data
    return (
        <div className={styles.block}>
            {videoBackground && (
                <video
                    className={styles.videoBg}
                    muted={true}
                    loop={true}
                    autoPlay={true}
                    playsInline={true}
                    preload="metadata"
                    src={videoBackground.src}
                />
            )}
            <Text type="postscript" className={styles.title}>
                {title}
            </Text>
            <CardsSlider hideControls scrollAreaClassName={styles.cardsScrollArea}>
                <ul className={styles.values}>
                    <li className={cn(styles.value, styles.value_big)}>
                        <StatisticValueCard {...data.first} />
                    </li>
                    <li className={styles.value}>
                        <StatisticValueCard {...data.second} />
                    </li>
                    <li className={styles.value}>
                        <StatisticValueCard {...data.third} />
                    </li>
                    <li className={styles.value}>
                        <StatisticValueCard {...data.fourth} />
                    </li>
                    <li className={styles.value}>
                        <StatisticValueCard {...data.fifth} />
                    </li>
                </ul>
            </CardsSlider>
            <PageSectionCardGrid>
                <PageSectionCardGridRightColumn className={styles.description}>
                    <Text type="pL" className={styles.descriptionText}>
                        {description}
                    </Text>
                </PageSectionCardGridRightColumn>
            </PageSectionCardGrid>
            <PageSectionCardGrid>
                <PageSectionCardGridRightColumn className={styles.contactUsText}>
                    <Text type="pL" className={styles.descriptionText}>
                        {contactWelcomeText}
                    </Text>
                    <Button link={`#${CONTACTS_SECTION_ID}`} className={styles.contactBtn}>
                        {contactButtonText}
                    </Button>
                </PageSectionCardGridRightColumn>
            </PageSectionCardGrid>
        </div>
    )
}
