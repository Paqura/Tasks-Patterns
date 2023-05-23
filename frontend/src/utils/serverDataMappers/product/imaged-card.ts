import { GetAttributesValues } from '@admin/general-schemas'

import { TImagedCard } from '@/components/ProductPage/components/ImagedCard'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

type TBackendImagedCardData = GetAttributesValues<'product.imaged-card'>

export const mapImagedCardServerData = (data: TBackendImagedCardData): TImagedCard => {
    return {
        title: data.title || '',
        description: data.description || '',
        image: mapImageMediaFile(data.image),
    }
}
