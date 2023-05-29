import { Response } from '@admin/general-schemas'
import { NextApiRequest, NextApiResponse } from 'next'

import { adminClient } from '@/utils/adminApi'

type TWebinarRegistrationRequestBody = {
    fullName: string
    email: string
    phone: string
    companyName: string
    companySite: string
}

type TWebinarRegistrationRequest = NextApiRequest & {
    body: TWebinarRegistrationRequestBody
}

const getWebinarData = async (webinarId: string | string[]) => {
    const response = await adminClient.get<Response<'api::news-item.news-item'>>(
        `/api/news/${webinarId}`
    )

    const { title: eventName, eventDate, isEvent } = response.data.data?.attributes ?? {}

    return { eventName, eventDate, isEvent }
}

export default async function handler(req: TWebinarRegistrationRequest, res: NextApiResponse) {
    const { webinarId } = req.query
    if (req.method === 'POST' && webinarId) {
        const { fullName, email, phone, companyName, companySite } = req.body
        const { eventName, eventDate, isEvent } = await getWebinarData(webinarId)

        if (!isEvent || !eventName || !eventDate) {
            // TODO: Fix message
            res.status(405).send({ message: 'Bad event' })
        }

        // TODO: Add a check for completed eventDate
        if (!eventDate && false) {
            res.status(405).send({ message: 'Event is completed' })
        }

        const response = await adminClient.post<Response<'api::webinar-request.webinar-request'>>(
            `/api/webinar-requests`,
            {
                data: {
                    companyName,
                    companySite,
                    email,
                    fullName,
                    phone,
                    eventDate,
                    eventName,
                },
            }
        )

        res.status(response.status).json({})
    } else {
        // TODO: Fix message
        res.status(405).send({ message: 'Bad request' })
    }
}
