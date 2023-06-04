import React from 'react'

import { CardsSlider } from '@/components/ui/CardsSlider'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'
import { TWithSectionParams } from '@/types'

import { AdvantageCard, TAdvantageCard } from './components/AdvantageCard'
import { TWelcomeToContactData, WelcomeToContact } from './components/WelcomeToContact'
import styles from './index.module.scss'

export type TAdvantagesBlockData = TWithSectionParams<{
    welcomeToContact?: TWelcomeToContactData
    expertiseCard: TAdvantageCard
    customerServiceCard: TAdvantageCard
    trackRecordCard: TAdvantageCard
    technologyCard: TAdvantageCard
    solutionsCard: TAdvantageCard
}>

export const Advantages: React.FC<{ data: TAdvantagesBlockData }> = ({ data }) => {
    const {
        title,
        description,
        welcomeToContact,
        expertiseCard,
        customerServiceCard,
        trackRecordCard,
        technologyCard,
        solutionsCard,
        sectionId,
    } = data
    return (
        <PageSectionCard mode="dark" sectionId={sectionId}>
            <PageSectionCardHeader title={title} description={description} />

            <CardsSlider hideControls scrollAreaClassName={styles.advantagesList}>
                <AdvantageCard data={expertiseCard} type="expertise" />
                <AdvantageCard data={customerServiceCard} type="customer-service" />
                <AdvantageCard data={trackRecordCard} type="track-record" />
                <AdvantageCard data={technologyCard} type="techology" />
                <AdvantageCard data={solutionsCard} type="solutions" />
            </CardsSlider>
            {welcomeToContact && (
                <div className={styles.welcomeToContact}>
                    <WelcomeToContact data={welcomeToContact} />
                </div>
            )}
        </PageSectionCard>
    )
}
