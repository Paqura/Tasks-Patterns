import { GetAttributesValues } from '@admin/general-schemas'

import { TImagesSliderBlockData } from '@/screens/product/ui/ImagesSliderBlock'
import { mapImageMediaFile } from '@/shared/lib/mappers/strapi'

type TBackendImagedCardsGridBlockData = Extract<
    Exclude<GetAttributesValues<'api::product.product'>['blocks'], undefined>[0],
    { __component: 'product.images-slider-block' }
>

export const mapImagesSliderBlockServerData = (
    block: TBackendImagedCardsGridBlockData,
): TImagesSliderBlockData => {
    return {
        title: block.title || '',
        description: block.description,
        slides:
            block.slides?.map((slide) => ({
                caption: slide.caption,
                image: mapImageMediaFile(slide.image) || { src: '' },
            })) || [],
    }
}
