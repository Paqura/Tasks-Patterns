import { GetAttributesValues } from '@admin/general-schemas'

import { mapNewsArticleServerData, TNewsArticleData } from '../news-article'

export type TEventFormData = {
    submit: string
    consentsTerms: string
    subscription: string
    company: string
    email: string
    name: string
    phone: string
    position: string
    title: string
    slug: string
}

export type TEventArticleData = TNewsArticleData

export type TEventArticle = {
    article: TEventArticleData
    form?: TEventFormData
}

const mapEventFormServerData = (
    serverArticleData?: GetAttributesValues<'api::news-item.news-item'>
): TEventFormData | undefined => {
    if (!serverArticleData?.eventForm) {
        return undefined
    }

    return {
        submit: serverArticleData.eventForm.buttonSubmit || '',
        consentsTerms: serverArticleData.eventForm?.checkboxConsentsTerms || '',
        subscription: serverArticleData.eventForm?.checkboxSubscription || '',
        company: serverArticleData.eventForm?.fieldCompany || '',
        email: serverArticleData.eventForm?.fieldEmail || '',
        name: serverArticleData.eventForm?.fieldName || '',
        phone: serverArticleData.eventForm?.fieldPhone || '',
        position: serverArticleData.eventForm?.fieldPosition || '',
        title: serverArticleData.eventForm?.title || '',
        slug: serverArticleData?.slug || '',
    }
}

export const mapEventArticleServerData = (
    serverArticleData?: GetAttributesValues<'api::news-item.news-item'>
): TEventArticle => {
    return {
        article: {
            ...mapNewsArticleServerData(serverArticleData),
            date: serverArticleData?.eventDate
                ? new Date(serverArticleData?.eventDate)
                : new Date(),
        },
        form: mapEventFormServerData(serverArticleData),
    }
}
