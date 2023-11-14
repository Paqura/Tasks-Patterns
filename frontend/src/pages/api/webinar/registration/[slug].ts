import { NextApiRequest, NextApiResponse } from 'next'

import { TLocale } from '@/services/translation'
import { TStrapiApi, getApi } from '@/shared/lib/adminApi'
import { TPublicationState, getPublicationStateFromQuery } from '@/shared/lib/publicationState'

export type TWebinarRegistrationRequestBody = {
    fullName: string
    email: string
    phone?: string
    companyName?: string
    companyPosition?: string
    locale: TLocale
}

type TWebinarRegistrationRequest = Omit<NextApiRequest, 'body'> & {
    body: TWebinarRegistrationRequestBody
}

const getWebinarData = async (
    slug: string,
    api: TStrapiApi,
    publicationState: TPublicationState,
) => {
    const response = await api.fetchNewsArticle(slug, publicationState)

    const { title: eventName, event } = response || {}

    return {
        eventName,
        eventDate: event?.date,
        eventLink: event?.link,
        isEvent: !!event,
    }
}

export default async function handler(req: TWebinarRegistrationRequest, res: NextApiResponse) {
    const { slug } = req.query
    if (req.method === 'POST' && slug && typeof slug === 'string') {
        try {
            const { fullName, email, phone, companyName, companyPosition, locale } = req.body

            const api = getApi(locale)
            const { eventName, eventDate, isEvent, eventLink } = await getWebinarData(
                slug,
                api,
                getPublicationStateFromQuery(req.query),
            )

            if (!isEvent || !eventName || !eventDate || !eventLink) {
                res.status(405).send({ message: 'Bad event' })
                return
            }

            if (new Date(eventDate).getTime() < new Date().getTime()) {
                res.status(405).send({ message: 'Event is completed' })
                return
            }

            const response = await api.createWebinarRequest({
                companyName,
                companyPosition,
                email,
                fullName,
                phone,
                eventDate: new Date(eventDate),
                eventName,
                eventLink,
            })

            res.status(response.status).json({})
        } catch (e) {
            res.status(500).send({ message: 'Bad request' })
        }
    } else {
        // TODO: Fix message
        res.status(500).send({ message: 'Bad request' })
    }
}
