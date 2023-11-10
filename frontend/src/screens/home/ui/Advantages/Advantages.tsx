import { CardsSlider } from '@/shared/ui/common/CardsSlider'
import { PageSection } from '@/shared/ui/project/PageSection'
import { TWithSectionParams } from '@/types'

import styles from './index.module.scss'
import { AdvantageCard, TAdvantageCard } from './ui/AdvantageCard'
import { TWelcomeToContactData, WelcomeToContact } from './ui/WelcomeToContact'

export type TAdvantagesBlockData = TWithSectionParams<{
    welcomeToContact?: TWelcomeToContactData
    expertiseCard: TAdvantageCard
    customerServiceCard: TAdvantageCard
    trackRecordCard: TAdvantageCard
    technologyCard: TAdvantageCard
    solutionsCard: TAdvantageCard
}>

type TAdvantagesProps = {
    data: TAdvantagesBlockData
    number: number
}

export const Advantages = ({ data, number }: TAdvantagesProps) => {
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
        <PageSection.Card mode="dark" sectionId={sectionId}>
            <PageSection.Header title={title} description={description} number={number} />

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
        </PageSection.Card>
    )
}
