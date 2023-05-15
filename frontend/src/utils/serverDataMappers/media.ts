import { MediaAttributeContent } from '@admin/general-schemas'

import { TImage } from '@/types'

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
