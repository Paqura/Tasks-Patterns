import React from 'react'

import { TProductTasksBlockData } from '@/components/ProductPage/types'
import { CardsSlider } from '@/components/ui/CardsSlider'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import { StatisticsItem } from './components/StatisticsItem'
import { TaskItem } from './components/TaskItem'
import styles from './index.module.scss'

export const TasksBlock: React.FC<{ data: TProductTasksBlockData }> = ({ data }) => {
    return (
        <PageSectionCard mode={'dark'}>
            <Heading level={1}>{data.title}</Heading>
            <Text className={styles.description} type="pL">
                {data.description}
            </Text>
            <CardsSlider scrollAreaClassName={styles.tasksListScrollArea}>
                <ul className={styles.tasksList}>
                    {data.tasks.map((task) => (
                        <li key={task.title} className={styles.taksListItem}>
                            <TaskItem
                                title={task.title}
                                description={task.description}
                                image={task.image}
                            />
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
