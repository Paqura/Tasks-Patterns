import { createHttpClient } from '@/services/http/client'
import { TLocale } from '@/services/translation'

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

type TPostSpecialPageInviteRequestArg = TSpecialPageInviteRequestBody

export const postSpecialPageInviteRequest = async (
    props: TPostSpecialPageInviteRequestArg,
): Promise<boolean> => {
    const client = createHttpClient({ baseURL: '/api' })
    const response = await client.post('/contacts/specialPage', props)

    return response.status === 200
}
