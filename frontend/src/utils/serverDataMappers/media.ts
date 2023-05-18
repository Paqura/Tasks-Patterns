import { MediaAttributeContent } from '@admin/general-schemas'

import { TFileData } from '@/components/AnaliticalArticle/types'
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
export const mapFilesServerData = (
    serverFilesData: MediaAttributeContent<'files', true> | undefined
): TFileData[] => {
    return (
        serverFilesData?.data?.map((item) => {
            return {
                name: item?.attributes?.name,
                title: item?.attributes?.caption || item?.attributes?.name || '',
                url: item?.attributes?.url || '',
            }
        }) ?? []
    )
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
