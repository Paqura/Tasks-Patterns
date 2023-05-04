import React from 'react'

import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'

const title = 'Why Positive Technologies?'
const description = `We have extensive experience in protecting businesses in various sectors of the economy, we know the nature of today's threats and regulatory requirements well - and we put that experience and that knowledge into everything we do`

export const Advantages: React.FC<{}> = () => {
    return (
        <PageSectionCard mode="dark">
            <PageSectionCardHeader title={title} description={description} />
        </PageSectionCard>
    )
}
