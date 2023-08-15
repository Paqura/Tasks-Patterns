import { NextApiRequest, NextApiResponse } from 'next'

import { getApi } from '@/utils/adminApi'
import { TLocale } from '@/utils/i18n'

export type TPartnershipRequestBody = {
    address?: string
    fullName: string
    companyName: string
    email: string
    phone?: string
    comment?: string
    locale: TLocale
}

type TPartnershipRequest = Omit<NextApiRequest, 'body'> & {
    body: TPartnershipRequestBody
}

export default async function handler(req: TPartnershipRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { address, fullName, companyName, email, phone, comment, locale } = req.body

            const api = getApi(locale)
            const response = await api.createPartnershipRequest({
                address,
                fullName,
                companyName,
                email,
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
