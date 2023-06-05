import { GetAttributesValues } from '@admin/general-schemas'

import { TProductData, TProductsBlockData } from '@/components/ProductPage/types'
import { TSelectOption } from '@/components/ui/Select'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

import { mapFaqBlockServerData } from './blocks/faq'
import { mapFilesBlockServerData } from './blocks/files'
import { mapImagedCardsGridBlockServerData } from './blocks/imaged-cards-grid'
import { mapImagesSliderBlockServerData } from './blocks/images-slider'
import { mapOtherProductsBlockServerData } from './blocks/other-products'
import { mapOverviewBlockServerData } from './blocks/overview'
import { mapProductTasksBlockServerData } from './blocks/tasks'
import { mapWelcomeToPilotBlockServerData } from './blocks/welcome-to-pilot'

const mapProductBlocksServerData = ({
    blocks,
    products,
}: {
    blocks: GetAttributesValues<'api::product.product'>['blocks']
    products?: GetAttributesValues<'api::product.product'>[]
}): TProductsBlockData[] => {
    return (
        (blocks
            ?.map<TProductsBlockData | null>((block, index) => {
                const defaultSectionId = `${block.__component}-${index}`

                switch (block.__component) {
                    case 'product.product-tasks-block':
                        return {
                            type: 'tasks',
                            data: mapProductTasksBlockServerData(block),
                            sectionId: block.sectionId || defaultSectionId,
                        }

                    case 'product.imaged-cards-grid-block':
                        return {
                            type: 'imaged-cards-grid',
                            data: mapImagedCardsGridBlockServerData(block),
                            sectionId: block.sectionId || defaultSectionId,
                        }
                    case 'product.images-slider-block':
                        return {
                            type: 'images-slider',
                            data: mapImagesSliderBlockServerData(block),
                            sectionId: block.sectionId || defaultSectionId,
                        }

                    case 'product.faq-block':
                        return {
                            type: 'faq',
                            data: mapFaqBlockServerData(block),
                            sectionId: block.sectionId || defaultSectionId,
                        }
                    case 'product.welcome-to-pilot-block':
                        return {
                            type: 'welcome-to-pilot',
                            data: mapWelcomeToPilotBlockServerData(block),
                        }
                    case 'product.files-block':
                        return {
                            type: 'files',
                            data: mapFilesBlockServerData(block),
                            sectionId: block.sectionId || defaultSectionId,
                        }
                    case 'product.other-products-block':
                        return {
                            type: 'other-products',
                            data: mapOtherProductsBlockServerData(block, products),
                            sectionId: block.sectionId || defaultSectionId,
                        }
                    case 'product.product-overview-block':
                        return {
                            type: 'overview',
                            data: mapOverviewBlockServerData(block),
                            sectionId: block.sectionId || defaultSectionId,
                        }

                    default:
                        return null
                }
            })
            .filter(Boolean) as TProductsBlockData[]) || []
    )
}

export const mapProductServerData = (
    productData: GetAttributesValues<'api::product.product'>,
    products?: GetAttributesValues<'api::product.product'>[]
): TProductData => {
    return {
        title: productData.title || '',
        subtitle: productData.subtitle,
        logo: mapImageMediaFile(productData.icon) || { src: '' },
        bannerImage: mapImageMediaFile(productData.bannerImage) || { src: '' },
        blocks: mapProductBlocksServerData({ blocks: productData.blocks, products: products }),
    }
}

export const getSelectProductOptionsServerData = (
    products?: GetAttributesValues<'api::product.product'>[]
): TSelectOption<string>[] => {
    return (products || []).map(({ title }) => ({
        value: title || '',
        label: title || '',
    }))
}
