import axios from 'axios'
import { stringify } from 'qs'

export const paramsSerializer = (params: Record<string, unknown>) => stringify(params)

const getClient = () => {
    const baseURL = process.env.NEXT_PUBLIC_ADMIN_API_URL
    if (!baseURL) {
        // eslint-disable-next-line no-console
        console.error('NEXT_PUBLIC_ADMIN_API_URL is empty')
    }

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: { 'Content-Type': 'application/json' },
        paramsSerializer,
    })
    return axiosInstance
}

export const adminClient = getClient()
