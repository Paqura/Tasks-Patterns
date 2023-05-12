import React from 'react'

import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'

import { ToolCard } from './components/ToolCard'
import styles from './index.module.scss'

const title = 'What we&nbsp;do?'
const description = `At&nbsp;PT&nbsp;Security, we&nbsp;take a&nbsp;comprehensive approach to&nbsp;cybersecurity. Our solutions are designed to&nbsp;protect your business from a&nbsp;wide range of&nbsp;threats, both internal and external.`

export const Tools: React.FC = () => {
    return (
        <PageSectionCard mode="light" sectionId="tools">
            <PageSectionCardHeader title={title} description={description} />
            <div className={styles.toolsList}>
                <ToolCard
                    type="assessment"
                    title="Assessment"
                    description="We&nbsp;begin by&nbsp;conducting a&nbsp;thorough assessment of&nbsp;your organization&rsquo;s security posture. This includes vulnerability scanning, penetration testing, and risk analysis. We&nbsp;use this information to&nbsp;develop a&nbsp;customized security plan that meets your specific needs and budget."
                />
                <ToolCard
                    type="compliance"
                    title="Compliance"
                    description="We&nbsp;help ensure that your organization is&nbsp;meeting all applicable regulatory requirements, such as&nbsp;HIPAA, PCI&nbsp;DSS, and GDPR. Our compliance management software makes it&nbsp;easy to&nbsp;stay up-to-date with changing regulations and avoid costly fines."
                />
                <ToolCard
                    type="monitoring"
                    title="Monitoring"
                    description="Our advanced monitoring software provides real-time visibility into your network activity, allowing&nbsp;us to&nbsp;detect and respond to&nbsp;threats quickly. We&nbsp;use a&nbsp;combination of&nbsp;automated and manual processes to&nbsp;ensure that your network is&nbsp;always protected."
                />
                <ToolCard
                    type="training"
                    title="Mraining"
                    description="We&nbsp;believe that cybersecurity is&nbsp;everyone&rsquo;s responsibility. That&rsquo;s why we&nbsp;offer comprehensive training programs to&nbsp;educate your employees on&nbsp;best practices and help prevent human error from compromising your security."
                />
            </div>
        </PageSectionCard>
    )
}
