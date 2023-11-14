import axios from 'axios'

import { TFeedbackRequestBody } from '@/pages/api/contacts/feedback'
import { TPartnershipRequestBody } from '@/pages/api/contacts/partnership'
import { TPilotApplicationRequestBody } from '@/pages/api/contacts/pilot-application'
import { TSpecialPageInviteRequestBody } from '@/pages/api/contacts/specialPage'
import { TWebinarRegistrationRequestBody } from '@/pages/api/webinar/registration/[slug]'
import { TLocale } from '@/services/translation'

const getClient = () => {
    return axios.create({
        baseURL: '/api',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const siteApiClient = getClient()

type TPostWebinarRequestArg = {
    slug: string
} & TWebinarRegistrationRequestBody

export const postWebinarRequest = async ({
    slug,
    ...restProps
}: TPostWebinarRequestArg): Promise<boolean> => {
    const response = await siteApiClient.post(`/webinar/registration/${slug}`, restProps)

    return response.status === 200
}

type TPostFeedbackRequestArg = TFeedbackRequestBody

export const postFeedbackRequest = async (props: TPostFeedbackRequestArg): Promise<boolean> => {
    const response = await siteApiClient.post('/contacts/feedback', props)

    return response.status === 200
}

type TPostPartnershipRequestArg = TPartnershipRequestBody

export const postPartnershipRequest = async (
    props: TPostPartnershipRequestArg,
): Promise<boolean> => {
    const response = await siteApiClient.post('/contacts/partnership', props)

    return response.status === 200
}

type TPostPilotApplicationRequestArg = TPilotApplicationRequestBody & {
    locale: TLocale
}

export const postPilotApplicationRequest = async (
    params: TPostPilotApplicationRequestArg,
): Promise<boolean> => {
    const response = await siteApiClient.post('/contacts/pilot-application', params)

    return response.status === 200
}

type TPostSpecialPageInviteRequestArg = TSpecialPageInviteRequestBody

export const postSpecialPageInviteRequest = async (
    props: TPostSpecialPageInviteRequestArg,
): Promise<boolean> => {
    const response = await siteApiClient.post('/contacts/specialPage', props)

    return response.status === 200
}
