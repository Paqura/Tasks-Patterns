import { GetAttributesValues } from '@admin/general-schemas'

import { mapFilesMediaFile } from 'src/utils/serverDataMappers/media'
import {
    mapNewsArticleServerData,
    TNewsArticleData,
} from 'src/utils/serverDataMappers/news-article'

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
    successTitle: string
    successDescription: string
}

export type TEventVideoData = {
    id: string
}

export type TEventCalendarData = {
    title: string
    description: string
    button: string
    calendar: string
}

export type TEventArticleData = TNewsArticleData

export type TEventArticle = {
    isCompleted: boolean
    article: TEventArticleData
    form?: TEventFormData
    video?: TEventVideoData
    calendar?: TEventCalendarData
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
        successTitle: serverArticleData.eventForm?.successTitle || '',
        successDescription: serverArticleData.eventForm?.successDescription || '',
        slug: serverArticleData?.slug || '',
    }
}

const mapEventVideoServerData = (
    serverArticleData?: GetAttributesValues<'api::news-item.news-item'>
): TEventVideoData | undefined => {
    if (!serverArticleData?.eventYoutubeVideoId) {
        return undefined
    }

    return {
        id: serverArticleData.eventYoutubeVideoId || '',
    }
}

const mapEventCalendarServerData = (
    serverArticleData?: GetAttributesValues<'api::news-item.news-item'>
): TEventCalendarData | undefined => {
    if (!serverArticleData?.eventCalendar) {
        return undefined
    }

    const { url } = mapFilesMediaFile(serverArticleData.eventCalendar?.calendar)

    return {
        title: serverArticleData.eventCalendar.title || '',
        description: serverArticleData.eventCalendar?.description || '',
        button: serverArticleData.eventCalendar?.button || '',
        calendar: url,
    }
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

    return {
        isCompleted,
        article,
        form: mapEventFormServerData(serverArticleData),
        video: mapEventVideoServerData(serverArticleData),
        calendar: mapEventCalendarServerData(serverArticleData),
    }
}
