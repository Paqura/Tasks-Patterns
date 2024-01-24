import { ImagedCard, TImagedCard } from '@/screens/product/ui/ImagedCard'
import { CardsSlider } from '@/shared/ui/common/CardsSlider'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'
import { StatisticsItem } from './ui/StatisticsItem'

type TStatistics = {
    title: string
    values: { value: string; label: string }[]
}

export type TProductTasksBlockData = {
    title: string
    description?: string
    tasks: TImagedCard[]
    statistics: TStatistics | null
}

type TTasksBlockProps = {
    data: TProductTasksBlockData
    sectionId: string
}

export const TasksBlock = ({ data, sectionId }: TTasksBlockProps) => {
    return (
        <PageSection.Card mode={'dark'} sectionId={sectionId}>
            <Heading level={1}>{data.title}</Heading>

            <Text className={styles.description} type="pL">
                {data.description}
            </Text>

            {data.tasks && data.tasks.length > 0 && (
                <CardsSlider classes={{ scrollArea: styles.tasksListScrollArea }}>
                    <ul className={styles.tasksList}>
                        {data.tasks.map((task) => (
                            <li key={task.title} className={styles.taksListItem}>
                                <ImagedCard data={task} />
                            </li>
                        ))}
                    </ul>
                </CardsSlider>
            )}

            {data.statistics && data.statistics.values.length > 0 && (
                <div className={styles.statistics}>
                    <Heading level={2}>{data.statistics.title}</Heading>

                    <CardsSlider classes={{ scrollArea: styles.statisticsListScrollArea }}>
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
        </PageSection.Card>
    )
}
