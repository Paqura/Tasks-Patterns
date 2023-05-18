import { MediaAttributeContent } from '@admin/general-schemas'

import { TImage, TVideo } from '@/types'

export const mapImageMediaFile = (
    serverMediaField: MediaAttributeContent<'images', false> | undefined
): TImage => {
    const attrs = serverMediaField?.data?.attributes
    return {
        src: attrs?.url || '',
        width: attrs?.width,
        height: attrs?.height,
    }
}

export const mapVideoMediaFile = (
    serverMediaField: MediaAttributeContent<'videos', false> | undefined
): TVideo => {
    const attrs = serverMediaField?.data?.attributes
    return {
        src: attrs?.url || '',
    }
}
