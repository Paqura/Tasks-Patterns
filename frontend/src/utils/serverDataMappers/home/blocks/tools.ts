import { GetAttributesValues } from '@admin/general-schemas'

import { TToolsBlockData } from '@/components/HomePage/components/Tools'
import { TToolCard } from '@/components/HomePage/components/Tools/components/ToolCard'

type TBackendBlockData = Extract<
    Exclude<GetAttributesValues<'api::main-page.main-page'>['blocks'], undefined>[0],
    { __component: 'main.tools-block' }
>

const mapToolCard = (data?: GetAttributesValues<'main.tool-card'>): TToolCard => ({
    title: data?.title || '',
    description: data?.description || '',
})

export const mapToolsBlockServerData = (block: TBackendBlockData): TToolsBlockData => {
    return {
        sectionId: block.sectionId || '',
        title: block.title || '',
        description: block.description,
        assessmentCard: mapToolCard(block.assessmentCard),
        complianceCard: mapToolCard(block.complianceCard),
        monitoringCard: mapToolCard(block.monitoringCard),
        trainingCard: mapToolCard(block.trainingCard),
    }
}
