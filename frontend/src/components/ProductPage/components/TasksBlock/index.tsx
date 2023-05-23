import React from 'react'

import { ImagedCard, TImagedCard } from '@/components/ProductPage/components/ImagedCard'
import { CardsSlider } from '@/components/ui/CardsSlider'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import { StatisticsItem } from './components/StatisticsItem'
import styles from './index.module.scss'

export type TProductTasksBlockData = {
    title: string
    description?: string
    tasks: TImagedCard[]
    statistics?: {
        title: string
        values: { value: string; label: string }[]
    }
}

export const TasksBlock: React.FC<{ data: TProductTasksBlockData; sectionId: string }> = ({
    data,
    sectionId,
}) => {
    return (
        <PageSectionCard mode={'dark'} sectionId={sectionId}>
            <Heading level={1}>{data.title}</Heading>
            <Text className={styles.description} type="pL">
                {data.description}
            </Text>
            <CardsSlider scrollAreaClassName={styles.tasksListScrollArea}>
                <ul className={styles.tasksList}>
                    {data.tasks.map((task) => (
                        <li key={task.title} className={styles.taksListItem}>
                            <ImagedCard data={task} />
                        </li>
                    ))}
                </ul>
            </CardsSlider>
            {data.statistics && (
                <div className={styles.statistics}>
                    <Heading level={2}>{data.statistics.title}</Heading>
                    <CardsSlider scrollAreaClassName={styles.statisticsListScrollArea}>
                        <ul className={styles.statisticsList}>
                            {data.statistics.values.map((stat, index) => (
                                <li key={index} className={styles.statisticsListItem}>
                                    <StatisticsItem value={stat.value} label={stat.label} />
                                </li>
                            ))}
                        </ul>
                    </CardsSlider>
                </div>
            )}
        </PageSectionCard>
    )
}
