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
    isRegistrationFinished: boolean
    eventHasAllFormData: boolean
    slug: string
    article: TEventArticleData
    calendar?: string
    completedVideo?: string
}

const FINISH_DATE_TIMEZONE = 3 //Moscow
const DAY_MS = 24 * 60 * 60 * 1000

export const mapEventArticleServerData = (
    serverArticleData?: GetAttributesValues<'api::news-item.news-item'>
): TEventArticle => {
    const nowDate = new Date()
    //поправка в милисекундах на таймзону сервера относительно таймзоны Москвы
    const timezoneOffsetFromMsk = (nowDate.getTimezoneOffset() + FINISH_DATE_TIMEZONE * 60) * 1000

    const article = {
        ...mapNewsArticleServerData(serverArticleData),
        date: serverArticleData?.event?.date
            ? new Date(serverArticleData?.event?.date).toISOString()
            : nowDate.toISOString(),
    }
    //Считаем вебинар завершенным по наступлению следующего дня.
    const isCompleted = new Date(article.date).getTime() + DAY_MS < nowDate.getTime()

    const registrationFinishDate = serverArticleData?.event?.registrationFinish
        ? new Date(serverArticleData?.event.registrationFinish)
        : null

    const isRegistrationFinished =
        !!registrationFinishDate &&
        registrationFinishDate.getTime() - timezoneOffsetFromMsk < nowDate.getTime()

    const eventHasAllFormData =
        !!serverArticleData?.event?.link &&
        !!serverArticleData?.event?.date &&
        !!serverArticleData?.title

    return {
        isCompleted,
        isRegistrationFinished,
        article,
        eventHasAllFormData,
        slug: serverArticleData?.slug || '',
        calendar: serverArticleData?.event?.calendar
            ? mapFilesMediaFile(serverArticleData.event.calendar).url
            : undefined,
        completedVideo: serverArticleData?.event?.completedYoutubeVideoId,
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
