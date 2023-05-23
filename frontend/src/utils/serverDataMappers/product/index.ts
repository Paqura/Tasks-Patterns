import { GetAttributesValues } from '@admin/general-schemas'

import { TProductData, TProductsBlockData } from '@/components/ProductPage/types'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

import { mapImagedCardsGridBlockServerData } from './blocks/imaged-cards-grid'
import { mapProductTasksBlockServerData } from './blocks/tasks'

const mapProductBlocksServerData = (
    blocks: GetAttributesValues<'api::product.product'>['blocks']
): TProductsBlockData[] => {
    return (
        (blocks
            ?.map<TProductsBlockData | null>((block, index) => {
                switch (block.__component) {
                    case 'product.product-tasks-block':
                        return {
                            type: 'tasks',
                            data: mapProductTasksBlockServerData(block),
                            sectionId: block.sectionId || 'tasks-' + index,
                        }

                    case 'product.imaged-cards-grid-block':
                        return {
                            type: 'imaged-cards-grid',
                            data: mapImagedCardsGridBlockServerData(block),
                            sectionId: block.sectionId || 'tasks-' + index,
                        }

                    default:
                        return null
                }
            })
            .filter(Boolean) as TProductsBlockData[]) || []
    )
}

export const mapProductServerData = (
    productData: GetAttributesValues<'api::product.product'>
): TProductData => {
    return {
        title: productData.title || '',
        subtitle: productData.subtitle,
        logo: mapImageMediaFile(productData.icon),
        bannerImage: mapImageMediaFile(productData.bannerImage),
        blocks: mapProductBlocksServerData(productData.blocks),
    }
}
