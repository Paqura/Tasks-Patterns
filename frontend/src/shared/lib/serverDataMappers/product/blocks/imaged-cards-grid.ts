import { GetAttributesValues } from '@admin/general-schemas'

import { TImagedCardsGridBlockData } from '@/screens/product/ui/ImagedCardsGridBlock'
import { mapImagedCardServerData } from '@/shared/lib/serverDataMappers/product/imaged-card'

type TBackendImagedCardsGridBlockData = Extract<
    Exclude<GetAttributesValues<'api::product.product'>['blocks'], undefined>[0],
    { __component: 'product.imaged-cards-grid-block' }
>

export const mapImagedCardsGridBlockServerData = (
    block: TBackendImagedCardsGridBlockData,
): TImagedCardsGridBlockData => {
    return {
        title: block.title || '',
        description: block.description,
        items: block.items?.map(mapImagedCardServerData) || [],
    }
}