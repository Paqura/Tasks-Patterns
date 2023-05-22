import { GetAttributesValues } from '@admin/general-schemas'

import { TProductData, TProductsBlockData } from '@/components/ProductPage'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

import { mapProductTasksBlockData } from './blocks/tasks'

const mapProductBlocksData = (
    blocks: GetAttributesValues<'api::product.product'>['blocks']
): TProductsBlockData[] => {
    return (
        (blocks
            ?.map<TProductsBlockData | null>((block, index) => {
                switch (block.__component) {
                    case 'product.product-tasks-block':
                        return {
                            type: 'tasks',
                            data: mapProductTasksBlockData(block),
                            sectionId: block.sectionId || 'tasks-' + index,
                        }

                    default:
                        return null
                }
            })
            .filter(Boolean) as TProductsBlockData[]) || []
    )
}

export const mapProduct = (
    productData: GetAttributesValues<'api::product.product'>
): TProductData => {
    return {
        title: productData.title || '',
        subtitle: productData.subtitle,
        logo: mapImageMediaFile(productData.icon),
        bannerImage: mapImageMediaFile(productData.bannerImage),
        blocks: mapProductBlocksData(productData.blocks),
    }
}
