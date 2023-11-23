import { CardsSlider } from '@/shared/ui/common/CardsSlider'
import { PageSection } from '@/shared/ui/project/PageSection'
import { TWithSectionParams } from '@/types'

import styles from './index.module.scss'
import { TToolCard, ToolCard } from './ui/ToolCard'

export type TToolsBlockData = TWithSectionParams<{
    assessmentCard: TToolCard
    complianceCard: TToolCard
    monitoringCard: TToolCard
    trainingCard: TToolCard
}>

type TToolsProps = {
    data: TToolsBlockData
    number: number
}

export const Tools = ({ data, number }: TToolsProps) => {
    const { title, description, assessmentCard, complianceCard, monitoringCard, trainingCard } =
        data

    return (
        <PageSection.Card mode="light" sectionId="tools">
            <PageSection.Header title={title} description={description} number={number} />

            <CardsSlider scrollAreaClassName={styles.toolsList}>
                <ToolCard type="assessment" data={assessmentCard} />
                <ToolCard type="compliance" data={complianceCard} />
                <ToolCard type="monitoring" data={monitoringCard} />
                <ToolCard type="training" data={trainingCard} />
            </CardsSlider>
        </PageSection.Card>
    )
}
