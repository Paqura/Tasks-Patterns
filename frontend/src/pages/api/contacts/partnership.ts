import { Response } from '@admin/general-schemas'
import { NextApiRequest, NextApiResponse } from 'next'

import { adminClient } from '@/utils/adminApi'

type TPartnershipRequestBody = {
    address: string
    fullName: string
    companyName: string
    email: string
    phone: string
    comment: string
}

type TPartnershipRequest = NextApiRequest & {
    body: TPartnershipRequestBody
}

export default async function handler(req: TPartnershipRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { address, fullName, companyName, email, phone, comment } = req.body

            const response = await adminClient.post<
                Response<'api::partnership-request.partnership-request'>
            >(`/api/partnership-requests`, {
                data: {
                    address,
                    fullName,
                    companyName,
                    email,
                    phone,
                    comment,
                },
            })

            res.status(response.status).json({})
        } catch (e) {
            res.status(500).send({ message: 'Bad request' })
        }
    } else {
        res.status(500).send({ message: 'Bad request' })
    }
}
