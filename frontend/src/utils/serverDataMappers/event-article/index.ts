import { GetAttributesValues } from '@admin/general-schemas'

import { mapFilesMediaFile } from 'src/utils/serverDataMappers/media'
import {
    mapNewsArticleServerData,
    TNewsArticleData,
} from 'src/utils/serverDataMappers/news-article'

export type TEventConfigData = {
    submit: string
    consentsTerms: string
    subscription: string
    company: string
    email: string
    name: string
    phone: string
    position: string
    title: string
    successTitle: string
    successDescription: string
    calendarTitle: string
    calendarDescription: string
    calendarButton: string
}

export type TEventArticleData = TNewsArticleData

export type TEventArticle = {
    isCompleted: boolean
    eventHasAllFormData: boolean
    slug: string
    article: TEventArticleData
    calendar?: string
    completedVideo?: string
}

export const mapEventArticleServerData = (
    serverArticleData?: GetAttributesValues<'api::news-item.news-item'>
): TEventArticle => {
    const nowDate = new Date()
    const article = {
        ...mapNewsArticleServerData(serverArticleData),
        date: serverArticleData?.eventDate ? new Date(serverArticleData?.eventDate) : nowDate,
    }
    const isCompleted = article.date.getTime() < nowDate.getTime()

    const eventHasAllFormData =
        !!serverArticleData?.eventLink &&
        !!serverArticleData?.eventDate &&
        !!serverArticleData?.title

    return {
        isCompleted,
        article,
        eventHasAllFormData,
        slug: serverArticleData?.slug || '',
        calendar: serverArticleData?.eventCalendar
            ? mapFilesMediaFile(serverArticleData.eventCalendar).url
            : undefined,
        completedVideo: serverArticleData?.eventCompletedYoutubeVideoId,
    }
}

export const mapWebinarConfigServerData = (
    serverWebinarConfigData?: GetAttributesValues<'api::webinar-config.webinar-config'>
): TEventConfigData => {
    return {
        submit: serverWebinarConfigData?.buttonSubmit || '',
        consentsTerms: serverWebinarConfigData?.checkboxConsentsTerms || '',
        subscription: serverWebinarConfigData?.checkboxSubscription || '',
        company: serverWebinarConfigData?.fieldCompany || '',
        email: serverWebinarConfigData?.fieldEmail || '',
        name: serverWebinarConfigData?.fieldName || '',
        phone: serverWebinarConfigData?.fieldPhone || '',
        position: serverWebinarConfigData?.fieldPosition || '',
        title: serverWebinarConfigData?.title || '',
        successTitle: serverWebinarConfigData?.successTitle || '',
        successDescription: serverWebinarConfigData?.successDescription || '',
        calendarTitle: serverWebinarConfigData?.calendarTitle || '',
        calendarDescription: serverWebinarConfigData?.calendarDescription || '',
        calendarButton: serverWebinarConfigData?.calendarButton || '',
    }
}
