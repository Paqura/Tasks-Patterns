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

    const { title: eventName, eventDate, isEvent } = response.data.data?.attributes ?? {}

    return { eventName, eventDate, isEvent }
}

export default async function handler(req: TWebinarRegistrationRequest, res: NextApiResponse) {
    const { slug } = req.query
    if (req.method === 'POST' && slug) {
        try {
            const { fullName, email, phone, companyName, companyPosition } = req.body
            const { eventName, eventDate, isEvent } = await getWebinarData(slug)

            if (!isEvent || !eventName || !eventDate) {
                // TODO: Fix message
                res.status(405).send({ message: 'Bad event' })
                return
            }

            // TODO: Add a check for completed eventDate
            if (!eventDate && false) {
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
