import { GetAttributesValues } from '@admin/general-schemas'

import { TImagedCard } from '@/screens/product/ui/ImagedCard'
import { mapImageMediaFile } from '@/shared/lib/serverDataMappers/media'

type TBackendImagedCardData = GetAttributesValues<'product.imaged-card'>

export const mapImagedCardServerData = (data: TBackendImagedCardData): TImagedCard => {
    return {
        title: data.title || '',
        description: data.description || '',
        image: mapImageMediaFile(data.image) || { src: '' },
    }
}
