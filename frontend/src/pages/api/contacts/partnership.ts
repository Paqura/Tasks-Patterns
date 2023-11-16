import { NextApiRequest, NextApiResponse } from 'next'

import { TLocale } from '@/services/translation'
import { getApi } from '@/shared/lib/adminApi'

export type TPartnershipRequestBody = {
    address?: string
    fullName: string
    companyName: string
    email: string
    phone?: string
    comment?: string
    locale: TLocale
    recipientEmail: string | undefined
}

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
