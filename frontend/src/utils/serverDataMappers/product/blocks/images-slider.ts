import { GetAttributesValues } from '@admin/general-schemas'

import { TImagesSliderBlockData } from '@/components/ProductPage/components/ImagesSliderBlock'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

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
