import { NextApiRequest, NextApiResponse } from 'next'

import { getApi } from '@/shared/lib/adminApi'
import { TLocale } from '@/shared/lib/i18n'

export type TFeedbackRequestBody = {
    fullName: string
    email: string
    phone: string
    comment: string
    locale: TLocale
}

type TFeedbackRequest = Omit<NextApiRequest, 'body'> & {
    body: TFeedbackRequestBody
}

export default async function handler(req: TFeedbackRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { fullName, email, phone, comment, locale } = req.body

            const api = getApi(locale)
            const response = await api.createFeedbackRequest({
                email,
                fullName,
                phone,
                comment,
            })

            res.status(response.status).json({})
        } catch (e) {
            res.status(500).send({ message: 'Bad request' })
        }
    } else {
        res.status(500).send({ message: 'Bad request' })
    }
}
