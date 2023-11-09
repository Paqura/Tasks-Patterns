import { GetAttributesValues, MediaAttributeContent } from '@admin/general-schemas'

import { TFileData } from '@/components/AnalyticalArticlePage/types'
import { TImage } from '@/types'

import { mapFilesServerData, mapImageMediaFile } from 'src/utils/serverDataMappers/media'

export type TNewsArticleData = {
    title: string
    topic: string
    date?: string
    image: TImage | null
    href: string
    content: string
    filesTitle: string
    files: TFileData[]
}

export const mapNewsArticleServerData = (
    serverArticleData?: Omit<GetAttributesValues<'api::news-item.news-item'>, 'event'>,
): TNewsArticleData => {
    return {
        content: serverArticleData?.content ?? '',
        files: serverArticleData?.files
            ? mapFilesServerData(serverArticleData?.files as MediaAttributeContent<'files', true>)
            : [],
        href: serverArticleData?.slug || '',
        date: serverArticleData?.published
            ? new Date(serverArticleData?.published).toISOString()
            : new Date().toISOString(),
        title: serverArticleData?.title || '',
        topic: serverArticleData?.topic || '',
        filesTitle: serverArticleData?.filesTitle || '',
        image: mapImageMediaFile(serverArticleData?.previewImage),
    }
}
