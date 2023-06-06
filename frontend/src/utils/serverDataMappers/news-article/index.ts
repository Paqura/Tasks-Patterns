import { GetAttributesValues, MediaAttributeContent } from '@admin/general-schemas'

import { TFileData } from '@/components/AnalyticalArticlePage/types'
import { TImage } from '@/types'

import { mapFilesServerData, mapImageMediaFile } from 'src/utils/serverDataMappers/media'

export type TNewsArticleData = {
    title: string
    topic: string
    date?: Date
    image?: TImage
    href: string
    content: string
    filesTitle: string
    files: TFileData[]
}

export const mapNewsArticleServerData = (
    serverArticleData?: GetAttributesValues<'api::news-item.news-item'>
): TNewsArticleData => {
    return {
        content: serverArticleData?.content ?? '',
        files: serverArticleData?.files
            ? mapFilesServerData(serverArticleData?.files as MediaAttributeContent<'files', true>)
            : [],
        href: serverArticleData?.slug || '',
        date: serverArticleData?.published ? new Date(serverArticleData?.published) : new Date(),
        title: serverArticleData?.title || '',
        topic: serverArticleData?.topic || '',
        filesTitle: serverArticleData?.filesTitle || '',
        image: mapImageMediaFile(serverArticleData?.previewImage) || undefined,
    }
}
