import { NextApiRequest, NextApiResponse } from 'next'

import { getApi } from '@/services/strapi/api'
import { TPartnershipRequestBody } from '@/widgets/AnyQuestions/lib/feedback'

type TPartnershipRequest = Omit<NextApiRequest, 'body'> & {
    body: TPartnershipRequestBody
}

export default async function handler(req: TPartnershipRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const {
                address,
                fullName,
                companyName,
                email,
                phone,
                comment,
                locale,
                recipientEmail,
            } = req.body

            const api = getApi(locale)
            const response = await api.createPartnershipRequest({
                address,
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
    } else {
        res.status(500).send({ message: 'Bad request' })
    }
}
