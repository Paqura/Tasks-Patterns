import cn from 'classnames'

import { CONTACTS_SECTION_ID } from '@/shared/lib/constants'
import { Button } from '@/shared/ui/common/Button'
import { CardsSlider } from '@/shared/ui/common/CardsSlider'
import { Text } from '@/shared/ui/common/typography/Text'
import { PageSection } from '@/shared/ui/project/PageSection'
import { TVideo } from '@/types'

import styles from './index.module.scss'
import { StatisticValueCard } from './ui/StatisticValueCard'

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

type TStatisticsProps = {
    data: TStatisticsData
}

export const Statistics = ({ data }: TStatisticsProps) => {
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

            <PageSection.Grid className={styles.section}>
                <PageSection.RightColumn className={styles.description}>
                    <Text type="pL" className={styles.descriptionText}>
                        {description}
                    </Text>
                </PageSection.RightColumn>
            </PageSection.Grid>

            <PageSection.Grid className={styles.section}>
                <PageSection.RightColumn className={styles.contactUsText}>
                    <Text type="pL" className={styles.descriptionText}>
                        {contactWelcomeText}
                    </Text>
                    <Button link={`#${CONTACTS_SECTION_ID}`} className={styles.contactBtn}>
                        {contactButtonText}
                    </Button>
                </PageSection.RightColumn>
            </PageSection.Grid>
        </div>
    )
}
