import { GetAttributesValues } from '@admin/general-schemas'

import { newsArticleMapper } from '@/screens/newsArticle'
import { TNewsArticleData } from '@/screens/newsArticle/mappers'
import { mapFilesMediaFile } from '@/shared/lib/mappers/strapi'

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

    recipientEmail: string | undefined
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

export const toDomain = (
    serverArticleData?: GetAttributesValues<'api::news-item.news-item'>,
): TEventArticle => {
    const nowDate = new Date()
    const serverTimeZoneOffsetMS = nowDate.getTimezoneOffset() * 60 * 1000

    const article = {
        ...newsArticleMapper.toDomain(serverArticleData),
        date: serverArticleData?.event?.date
            ? new Date(serverArticleData?.event?.date).toISOString()
            : nowDate.toISOString(),
    }

    const isCompleted =
        new Date(article.date).getTime() + serverTimeZoneOffsetMS < nowDate.getTime()

    const registrationFinishDate = serverArticleData?.event?.registrationFinish
        ? new Date(serverArticleData?.event.registrationFinish)
        : null

    const isRegistrationFinished =
        !!registrationFinishDate &&
        registrationFinishDate.getTime() < nowDate.getTime() + serverTimeZoneOffsetMS

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

export const config = (
    serverWebinarConfigData?: GetAttributesValues<'api::webinar-config.webinar-config'>,
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
        recipientEmail: serverWebinarConfigData?.recipientEmail,
    }
}
