import { Response } from '@admin/general-schemas'
import { NextApiRequest, NextApiResponse } from 'next'

import { adminClient } from '@/utils/adminApi'

type TWebinarRegistrationRequestBody = {
    fullName: string
    email: string
    phone: string
    companyName: string
    companyPosition: string
}

type TWebinarRegistrationRequest = NextApiRequest & {
    body: TWebinarRegistrationRequestBody
}

const getWebinarData = async (slug: string | string[]) => {
    const response = await adminClient.get<Response<'api::news-item.news-item'>>(
        `/api/news/${slug}`
    )

    const { title: eventName, event } = response.data.data?.attributes ?? {}

    return {
        eventName,
        eventDate: event?.date,
        eventLink: event?.link,
        isEvent: !!event,
    }
}

export default async function handler(req: TWebinarRegistrationRequest, res: NextApiResponse) {
    const { slug } = req.query
    if (req.method === 'POST' && slug) {
        try {
            const { fullName, email, phone, companyName, companyPosition } = req.body
            const { eventName, eventDate, isEvent, eventLink } = await getWebinarData(slug)

            if (!isEvent || !eventName || !eventDate || !eventLink) {
                res.status(405).send({ message: 'Bad event' })
                return
            }

            if (new Date(eventDate).getTime() < new Date().getTime()) {
                res.status(405).send({ message: 'Event is completed' })
                return
            }

            const response = await adminClient.post<
                Response<'api::webinar-request.webinar-request'>
            >(`/api/webinar-requests`, {
                data: {
                    companyName,
                    companyPosition,
                    email,
                    fullName,
                    phone,
                    eventDate,
                    eventName,
                    eventLink,
                },
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
