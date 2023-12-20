import { NextApiRequest, NextApiResponse } from 'next'

import { getApi } from '@/services/strapi/api'
import { TFeedbackRequestBody } from '@/widgets/AnyQuestions/lib/feedback'

type TFeedbackRequest = Omit<NextApiRequest, 'body'> & {
    body: TFeedbackRequestBody
}

export default async function handler(req: TFeedbackRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(500).send({ message: 'Bad request' })
    }

    try {
        const { fullName, email, phone, comment, locale, recipientEmail } = req.body

        const api = getApi(locale)
        const response = await api.createFeedbackRequest({
            email,
            fullName,
            phone,
            comment,
            recipientEmail,
        })

        res.status(response.status).json({})
    } catch (e) {
        res.status(500).send({ message: 'Bad request' })
    }
}
