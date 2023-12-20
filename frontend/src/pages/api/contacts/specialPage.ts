import { NextApiRequest, NextApiResponse } from 'next'

import { TSpecialPageInviteRequestBody } from '@/screens/special/lib/invite'
import { getApi } from '@/services/strapi/api'

type TSpecialPageInviteRequest = Omit<NextApiRequest, 'body'> & {
    body: TSpecialPageInviteRequestBody
}

export default async function handler(req: TSpecialPageInviteRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(500).send({ message: 'Bad request' })
    }

    try {
        const {
            fullName,
            email,
            company,
            message,
            recipientEmail,
            locale,
            emailTemplateName,
            slug,
        } = req.body

        const api = getApi(locale)
        const response = await api.createSpecialPageInviteRequest({
            email,
            fullName,
            company,
            recipientEmail,
            message,
            emailTemplateName,
            pageSlug: slug,
        })

        res.status(response.status).json({})
    } catch (e) {
        res.status(500).send({ message: 'Bad request' })
    }
}
