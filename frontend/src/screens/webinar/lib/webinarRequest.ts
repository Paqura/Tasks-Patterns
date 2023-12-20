import { createHttpClient } from '@/services/http/client'
import { TLocale } from '@/services/translation'

export type TWebinarRegistrationRequestBody = {
    fullName: string
    email: string
    phone?: string
    companyName?: string
    companyPosition?: string
    locale: TLocale
    recipientEmail?: string
}

type TPostWebinarRequestArg = {
    slug: string
} & TWebinarRegistrationRequestBody

export const postWebinarRequest = async ({
    slug,
    ...restProps
}: TPostWebinarRequestArg): Promise<boolean> => {
    const client = createHttpClient({ baseURL: '/api' })
    const response = await client.post(`/webinar/registration/${slug}`, restProps)

    return response.status === 200
}
