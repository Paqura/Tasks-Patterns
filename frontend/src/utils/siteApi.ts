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
