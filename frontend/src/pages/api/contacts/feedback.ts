import { Response } from '@admin/general-schemas'
import { NextApiRequest, NextApiResponse } from 'next'

import { adminClient } from '@/utils/adminApi'

type TFeedbackRequestBody = {
    fullName: string
    email: string
    phone: string
    question: string
}

type TFeedbackRequest = NextApiRequest & {
    body: TFeedbackRequestBody
}

export default async function handler(req: TFeedbackRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { fullName, email, phone, comment } = req.body

            const response = await adminClient.post<
                Response<'api::feedback-request.feedback-request'>
            >(`/api/feedback-requests`, {
                data: {
                    email,
                    fullName,
                    phone,
                    comment,
                },
            })

            res.status(response.status).json({})
        } catch (e) {
            res.status(500).send({ message: 'Bad request' })
        }
    } else {
        res.status(500).send({ message: 'Bad request' })
    }
}
