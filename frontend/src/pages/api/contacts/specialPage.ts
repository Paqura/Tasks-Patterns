import { NextApiRequest, NextApiResponse } from 'next'

import { getApi } from '@/utils/adminApi'
import { TLocale } from '@/utils/i18n'

export type TSpecialPageInviteRequestBody = {
    fullName: string
    email: string
    company: string
    message: string
    recipientEmail: string
    emailTemplateName: string
    slug: string
    locale: TLocale
}

type TSpecialPageInviteRequest = Omit<NextApiRequest, 'body'> & {
    body: TSpecialPageInviteRequestBody
}

export default async function handler(req: TSpecialPageInviteRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
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
    } else {
        res.status(500).send({ message: 'Bad request' })
    }
}
