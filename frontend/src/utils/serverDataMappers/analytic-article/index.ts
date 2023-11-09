import { GetAttributesValues, MediaAttributeContent } from '@admin/general-schemas'

import { TAnalitycArticleData, TArticleSection } from '@/components/AnalyticalArticlePage/types'

import { mapFilesServerData } from 'src/utils/serverDataMappers/media'

const mapArticleSectionsServerData = (
    article: GetAttributesValues<'article-section.article-section'>[],
): TArticleSection[] => {
    return article.map((item) => {
        return {
            title: item.title || '',
            value: item.value || '',
        }
    })
}

export const mapArticleServerData = (
    serverArticleData?: GetAttributesValues<'api::analytic-article.analytic-article'>,
): TAnalitycArticleData => {
    return {
        titleTableOfContent: serverArticleData?.tableOfContent || '',
        articleText:
            (serverArticleData?.articleText &&
                mapArticleSectionsServerData(serverArticleData?.articleText)) ??
            [],
        files: serverArticleData?.files
            ? mapFilesServerData(serverArticleData?.files as MediaAttributeContent<'files', true>)
            : [],
        slug: serverArticleData?.slug || '',
        published: serverArticleData?.published && serverArticleData?.published,
        tag: serverArticleData?.tag || '',
        title: serverArticleData?.title || '',
        topic: serverArticleData?.topic || '',
        titleOfHelpfulFiles: serverArticleData?.titleOfHelpfulFiles || '',
    }
}
