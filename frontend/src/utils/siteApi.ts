import axios from 'axios'

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
    fullName?: string
    email?: string
    phone?: string
    companyName?: string
    companyPosition?: string
}

export const postWebinarRequest = async ({
    slug,
    fullName,
    email,
    phone,
    companyName,
    companyPosition,
}: TPostWebinarRequestArg): Promise<boolean> => {
    const response = await siteApiClient.post(`/webinar/registration/${slug}`, {
        fullName,
        email,
        phone,
        companyName,
        companyPosition,
    })

    return response.status === 200
}

type TPostFeedbackRequestArg = {
    fullName?: string
    email?: string
    phone?: string
    comment?: string
}

export const postFeedbackRequest = async ({
    fullName,
    email,
    phone,
    comment,
}: TPostFeedbackRequestArg): Promise<boolean> => {
    const response = await siteApiClient.post('/contacts/feedback', {
        fullName,
        email,
        phone,
        comment,
    })

    return response.status === 200
}

type TPostPartnershipRequestArg = {
    fullName?: string
    email?: string
    phone?: string
    comment?: string
    companyName?: string
}

export const postPartnershipRequest = async ({
    fullName,
    email,
    phone,
    comment,
    companyName,
}: TPostPartnershipRequestArg): Promise<boolean> => {
    const response = await siteApiClient.post('/contacts/partnership', {
        fullName,
        email,
        phone,
        comment,
        companyName,
    })

    return response.status === 200
}

type TPostPilotApplicationRequestArg = {
    product?: string
    fullName?: string
    email?: string
    phone?: string
    comment?: string
    companyName?: string
}

export const postPilotApplicationRequest = async ({
    product,
    fullName,
    email,
    phone,
    comment,
    companyName,
}: TPostPilotApplicationRequestArg): Promise<boolean> => {
    const response = await siteApiClient.post('/contacts/pilot-application', {
        product,
        fullName,
        email,
        phone,
        comment,
        companyName,
    })

    return response.status === 200
}
