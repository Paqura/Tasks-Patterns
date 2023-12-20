import { stringify } from 'qs'

export const paramsSerializer = (params: Record<string, unknown>) =>
    stringify(params, {
        arrayFormat: 'brackets',
    })
