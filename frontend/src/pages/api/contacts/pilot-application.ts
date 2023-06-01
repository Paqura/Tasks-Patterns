import { Response } from '@admin/general-schemas'
import { NextApiRequest, NextApiResponse } from 'next'

import { adminClient } from '@/utils/adminApi'

type TPilotApplicationRequestBody = {
    product: string
    fullName: string
    companyName: string
    email: string
    phone: string
    comment: string
}

type TPilotApplicationRequest = NextApiRequest & {
    body: TPilotApplicationRequestBody
}

export default async function handler(req: TPilotApplicationRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { product, fullName, companyName, email, phone, comment } = req.body

            // TODO CHECK PRODUCT IN DB
            const response = await adminClient.post<
                Response<'api::pilot-application-request.pilot-application-request'>
            >(`/api/pilot-application-requests`, {
                data: {
                    product,
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
