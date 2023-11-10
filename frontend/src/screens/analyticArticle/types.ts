export type TFileData = {
    name: string
    title: string
    url: string
}

export type TArticleSection = {
    title: string
    value: string
}

export type TAnalyticArticleData = {
    titleTableOfContent?: string
    articleText: TArticleSection[]
    files: TFileData[]
    slug: string
    published?: Date
    tag: string
    title: string
    topic: string
    titleOfHelpfulFiles: string
}
