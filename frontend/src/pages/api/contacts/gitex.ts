import { NextApiRequest, NextApiResponse } from 'next'

import { getApi } from '@/utils/adminApi'
import { TLocale } from '@/utils/i18n'

export type TGitexInviteRequestBody = {
    fullName: string
    email: string
    company: string
    message: string
    locale: TLocale
}

type TGitexInviteRequest = Omit<NextApiRequest, 'body'> & {
    body: TGitexInviteRequestBody
}

export default async function handler(req: TGitexInviteRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { fullName, email, company, message, locale } = req.body

            const api = getApi(locale)
            const response = await api.createGitexInviteRequest({
                email,
                fullName,
                company,
                message,
            })

            res.status(response.status).json({})
        } catch (e) {
            res.status(500).send({ message: 'Bad request' })
        }
    } else {
        res.status(500).send({ message: 'Bad request' })
    }
}
