import { GetAttributesValues } from '@admin/general-schemas'

import { TImagedCard } from '../../ui/ImagedCard'
import { TImagedCardsGridBlockData } from '@/screens/product/ui/ImagedCardsGridBlock'
import { mapImageMediaFile } from '@/shared/lib/mappers/strapi'

type TBackendImagedCardsGridBlockData = Extract<
    Exclude<GetAttributesValues<'api::product.product'>['blocks'], undefined>[0],
    { __component: 'product.imaged-cards-grid-block' }
>

type TBackendImagedCardData = GetAttributesValues<'product.imaged-card'>

const mapImagedCardServerData = (data: TBackendImagedCardData): TImagedCard => {
    return {
        title: data.title || '',
        description: data.description || '',
        image: mapImageMediaFile(data.image) || { src: '' },
    }
}

export const mapImagedCardsGridBlockServerData = (
    block: TBackendImagedCardsGridBlockData,
): TImagedCardsGridBlockData => {
    return {
        title: block.title || '',
        description: block.description,
        items: block.items?.map(mapImagedCardServerData) || [],
    }
}
