import React from 'react'

import { CardsSlider } from '@/components/ui/CardsSlider'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'
import { TWithSectionParams } from '@/types'

import { TToolCard, ToolCard } from './components/ToolCard'
import styles from './index.module.scss'

export type TToolsBlockData = TWithSectionParams<{
    assessmentCard: TToolCard
    complianceCard: TToolCard
    monitoringCard: TToolCard
    trainingCard: TToolCard
}>

export const Tools: React.FC<{ data: TToolsBlockData }> = ({ data }) => {
    const { title, description, assessmentCard, complianceCard, monitoringCard, trainingCard } =
        data
    return (
        <PageSectionCard mode="light" sectionId="tools">
            <PageSectionCardHeader title={title} description={description} />
            <CardsSlider scrollAreaClassName={styles.toolsList}>
                <ToolCard type="assessment" data={assessmentCard} />
                <ToolCard type="compliance" data={complianceCard} />
                <ToolCard type="monitoring" data={monitoringCard} />
                <ToolCard type="training" data={trainingCard} />
            </CardsSlider>
        </PageSectionCard>
    )
}
