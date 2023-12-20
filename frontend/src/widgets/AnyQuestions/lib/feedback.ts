import { createHttpClient } from '@/services/http/client'
import { TLocale } from '@/services/translation'

const client = createHttpClient({ baseURL: '/api' })

export type TFeedbackRequestBody = {
    fullName: string
    email: string
    phone: string
    comment: string
    locale: TLocale
    recipientEmail: string | undefined
}

type TPostFeedbackRequestArg = TFeedbackRequestBody

export const postFeedbackRequest = async (props: TPostFeedbackRequestArg): Promise<boolean> => {
    const response = await client.post('/contacts/feedback', props)

    return response.status === 200
}

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

type TPostPartnershipRequestArg = TPartnershipRequestBody

export const postPartnershipRequest = async (
    props: TPostPartnershipRequestArg,
): Promise<boolean> => {
    const response = await client.post('/contacts/partnership', props)

    return response.status === 200
}

export type TPilotApplicationRequestBody = {
    product: string
    fullName: string
    companyName: string
    email: string
    phone?: string
    comment?: string
    locale: TLocale
    recipientEmail: string | undefined
}

type TPostPilotApplicationRequestArg = TPilotApplicationRequestBody & {
    locale: TLocale
}

export const postPilotApplicationRequest = async (
    params: TPostPilotApplicationRequestArg,
): Promise<boolean> => {
    const response = await client.post('/contacts/pilot-application', params)

    return response.status === 200
}
