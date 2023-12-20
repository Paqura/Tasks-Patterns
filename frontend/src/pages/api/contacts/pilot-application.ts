import { NextApiRequest, NextApiResponse } from 'next'

import { getApi } from '@/services/strapi/api'
import { TPilotApplicationRequestBody } from '@/widgets/AnyQuestions/lib/feedback'

type TPilotApplicationRequest = Omit<NextApiRequest, 'body'> & {
    body: TPilotApplicationRequestBody
}

export default async function handler(req: TPilotApplicationRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(500).send({ message: 'Bad request' })
    }

    try {
        const { product, fullName, companyName, email, phone, comment, locale, recipientEmail } =
            req.body

        const api = getApi(locale)

        // TODO CHECK PRODUCT IN DB
        const response = await api.createPilotRequest({
            product,
            fullName,
            companyName,
            email,
            phone,
            comment,
            recipientEmail,
        })

        res.status(response.status).json({})
    } catch (e) {
        res.status(500).send({ message: 'Bad request' })
    }
}
