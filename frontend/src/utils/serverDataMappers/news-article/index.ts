import { GetAttributesValues, MediaAttributeContent, WithID } from '@admin/general-schemas'

import { TArticleSection, TFileData } from '@/components/AnaliticalArticle/types'
import { TImage } from '@/types'

import { mapFilesServerData, mapImageMediaFile } from 'src/utils/serverDataMappers/media'

export type TNewsArticleData = {
    title: string
    topic: string
    date?: Date
    image?: TImage
    href: string
    articleText: TArticleSection[]
    filesTitle: string
    files: TFileData[]
}

export type TEventArticleData = TNewsArticleData

const mapArticleSectionsServerData = (
    article: WithID & GetAttributesValues<'article-section.article-section'>[]
): TArticleSection[] => {
    return article.map((item) => {
        return {
            title: item.title || '',
            value: item.value || '',
            number: item.number || 0,
        }
    })
}

export const mapNewsArticleServerData = (
    serverArticleData?: GetAttributesValues<'api::news-item.news-item'>
): TNewsArticleData => {
    return {
        articleText:
            (serverArticleData?.articleText &&
                mapArticleSectionsServerData(serverArticleData?.articleText)) ??
            [],
        files: serverArticleData?.files
            ? mapFilesServerData(serverArticleData?.files as MediaAttributeContent<'files', true>)
            : [],
        href: serverArticleData?.slug || '',
        date: serverArticleData?.published ? new Date(serverArticleData?.published) : new Date(),
        title: serverArticleData?.title || '',
        topic: serverArticleData?.topic || '',
        filesTitle: serverArticleData?.titleOfHelpfulFiles || '',
        image: mapImageMediaFile(serverArticleData?.previewImage) || { src: '' },
    }
}

export const mapEventArticleServerData = (
    serverArticleData?: GetAttributesValues<'api::news-item.news-item'>
): TEventArticleData => {
    return {
        ...mapNewsArticleServerData(serverArticleData),
        date: serverArticleData?.eventDate
            ? new Date(serverArticleData?.eventDate)
            : new Date(),
    }
}
