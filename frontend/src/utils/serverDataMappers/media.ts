import { MediaAttributeContent } from '@admin/general-schemas'

import { TImage } from '@/types'

export const mapImageMediaFile = (
    serverMediaField: MediaAttributeContent<'images', false> | undefined
): TImage => {
    const attrs = serverMediaField?.data.attributes
    return {
        src: attrs?.url ? `${process.env.NEXT_PUBLIC_ADMIN_API_URL}${attrs.url}` : '',
        width: attrs?.width,
        height: attrs?.height,
    }
}
