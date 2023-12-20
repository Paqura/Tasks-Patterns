import { NextApiRequest, NextApiResponse } from 'next'

import { TWebinarRegistrationRequestBody } from '@/screens/webinar/lib/webinarRequest'
import { TStrapiApi, getApi } from '@/services/strapi/api'
import { TPublicationState, getPublicationStateFromQuery } from '@/shared/lib/publicationState'

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

    const isCorrectRequest = req.method === 'POST' && typeof slug === 'string'

    if (!isCorrectRequest) {
        return res.status(500).send({ message: 'Bad request' })
    }

    const { fullName, email, phone, companyName, companyPosition, locale, recipientEmail } =
        req.body

    try {
        const api = getApi(locale)

        const { eventName, eventDate, isEvent, eventLink } = await getWebinarData(
            slug,
            api,
            getPublicationStateFromQuery(req.query),
        )

        const isBadEvent = !isEvent || !eventName || !eventDate || !eventLink

        if (isBadEvent) {
            return res.status(405).send({ message: 'Bad event' })
        }

        const isEventCompleted = new Date(eventDate).getTime() < new Date().getTime()

        if (isEventCompleted) {
            return res.status(405).send({ message: 'Event is completed' })
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
            recipientEmail,
        })

        res.status(response.status).json({})
    } catch (e) {
        res.status(500).send({ message: 'Bad request' })
    }
}
