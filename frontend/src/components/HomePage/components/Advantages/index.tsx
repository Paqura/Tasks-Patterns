import React from 'react'

import { CardsSlider } from '@/components/ui/CardsSlider'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'

import { AdvantageCard } from './components/AdvantageCard'
import { WelcomeToContact } from './components/WelcomeToContact'
import styles from './index.module.scss'

const title = 'Why Positive Technologies?'
const description = `We&nbsp;have extensive experience in&nbsp;protecting businesses in&nbsp;various sectors of&nbsp;the economy, we&nbsp;know the nature of&nbsp;today&rsquo;s threats and regulatory requirements well&nbsp;&mdash; and we&nbsp;put that experience and that knowledge into everything we&nbsp;do`

export const Advantages: React.FC<{}> = () => {
    return (
        <PageSectionCard mode="dark" sectionId="advantages">
            <PageSectionCardHeader title={title} description={description} />

            <CardsSlider hideControls scrollAreaClassName={styles.advantagesList}>
                <AdvantageCard
                    title="Expertise"
                    description="Our team of&nbsp;cybersecurity professionals has years of&nbsp;experience working with companies of&nbsp;all sizes and in&nbsp;all industries. We&nbsp;stay up-to-date with the latest threats and vulnerabilities, so&nbsp;you don&rsquo;t have&nbsp;to."
                    type="expertise"
                />
                <AdvantageCard
                    title="Customer service"
                    description="We&nbsp;are committed to&nbsp;providing the highest level of&nbsp;customer service. Our team is&nbsp;responsive, proactive, and always available to&nbsp;answer your questions and address your concerns."
                    type="customer-service"
                />
                <AdvantageCard
                    title="Proven track record"
                    description="We&nbsp;have a&nbsp;proven track record of&nbsp;delivering results for our clients. Our team has helped companies prevent cyber attacks, minimize the impact of&nbsp;data breaches, and meet regulatory requirements."
                    type="track-record"
                />
                <AdvantageCard
                    title="Cutting-edge technology"
                    description="We&nbsp;use the latest tools and technology to&nbsp;provide the most effective cybersecurity solutions. We&nbsp;are always exploring new technologies and techniques to&nbsp;stay ahead of&nbsp;the ever-evolving threat landscape."
                    type="techology"
                />
                <AdvantageCard
                    title="Comprehensive solutions"
                    description="We&nbsp;offer a&nbsp;wide range of&nbsp;cybersecurity services, including vulnerability assessment, compliance management, and threat analysis. Our solutions are customized to&nbsp;meet your specific needs and budget."
                    type="solutions"
                />
            </CardsSlider>
            <div className={styles.welcomeToContact}>
                <WelcomeToContact />
            </div>
        </PageSectionCard>
    )
}
