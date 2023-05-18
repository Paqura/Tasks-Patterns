export type TFileData = {
    name: string
    title: string
    url: string
}

export type TArticleSection = {
    title: string
    value: string
    number: number
}

export type TAnalitycArticleData = {
    titleTableOfContent?: string
    articleText: TArticleSection[]
    files: TFileData[]
    slug: string
    published: Date
    tag: string
    title: string
    topic: string
    titleOfHelpfulFiles: string
}
