import { NextApiRequest, NextApiResponse } from 'next'

import { getApi } from '@/utils/adminApi'
import { TLocale } from '@/utils/i18n'

export type TPilotApplicationRequestBody = {
    product: string
    fullName: string
    companyName: string
    email: string
    phone?: string
    comment?: string
    locale: TLocale
}

type TPilotApplicationRequest = Omit<NextApiRequest, 'body'> & {
    body: TPilotApplicationRequestBody
}

export default async function handler(req: TPilotApplicationRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { product, fullName, companyName, email, phone, comment, locale } = req.body

            const api = getApi(locale)

            // TODO CHECK PRODUCT IN DB
            const response = await api.createPilotRequest({
                product,
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
