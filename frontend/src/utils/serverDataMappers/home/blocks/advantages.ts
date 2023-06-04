import { GetAttributesValues } from '@admin/general-schemas'

import { TAdvantagesBlockData } from '@/components/HomePage/components/Advantages'
import { TAdvantageCard } from '@/components/HomePage/components/Advantages/components/AdvantageCard'

type TBackendBlockData = Extract<
    Exclude<GetAttributesValues<'api::main-page.main-page'>['blocks'], undefined>[0],
    { __component: 'main.advantages-block' }
>

const mapAdvatnage = (data?: GetAttributesValues<'main.advantage-card'>): TAdvantageCard => ({
    title: data?.title || '',
    description: data?.description || '',
})

export const mapAdvantagesBlockServerData = (block: TBackendBlockData): TAdvantagesBlockData => {
    return {
        sectionId: block.sectionId || '',
        title: block.title || '',
        description: block.description,
        welcomeToContact: block.welcomeToContact && {
            title: block.welcomeToContact.title || '',
            description: block.welcomeToContact.description || '',
            accentText: block.welcomeToContact.accentText,
            buttonText: block.welcomeToContact.buttonText || 'Contact us',
        },
        expertiseCard: mapAdvatnage(block.expertiseCard),
        customerServiceCard: mapAdvatnage(block.customerServiceCard),
        trackRecordCard: mapAdvatnage(block.trackRecordCard),
        technologyCard: mapAdvatnage(block.technologyCard),
        solutionsCard: mapAdvatnage(block.solutionsCard),
    }
}
