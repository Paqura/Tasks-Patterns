import { MediaAttributeContent } from '@admin/general-schemas'

import { TImage, TVideo } from '@/types'

const mapImageAttributes = (
    attrs: Exclude<
        Exclude<MediaAttributeContent<'images', false>, undefined>['data'],
        undefined
    >['attributes']
): TImage => ({
    src: attrs?.url || '',
    width: attrs?.width,
    height: attrs?.height,
    alt: attrs?.alt,
})

export const mapImageMediaFile = (
    serverMediaField: MediaAttributeContent<'images', false> | undefined
): TImage | null => {
    return serverMediaField?.data?.attributes
        ? mapImageAttributes(serverMediaField?.data?.attributes)
        : null
}
export const mapMultipleImageMediaFile = (
    serverMediaField: MediaAttributeContent<'images', true> | undefined
): TImage[] => {
    return (
        (serverMediaField?.data
            ?.map((file) => {
                return file?.attributes ? mapImageAttributes(file.attributes) : null
            })
            .filter(Boolean) as TImage[]) || []
    )
}

export const mapVideoMediaFile = (
    serverMediaField: MediaAttributeContent<'videos', false> | undefined
): TVideo => {
    const attrs = serverMediaField?.data?.attributes
    return {
        src: attrs?.url || '',
    }
}
