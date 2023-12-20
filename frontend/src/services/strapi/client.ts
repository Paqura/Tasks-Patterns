import axios from 'axios'

import { paramsSerializer } from '@/shared/lib/serializer'

export const getClient = (params: Record<string, unknown> = {}) => {
    const baseURL = process.env.NEXT_PUBLIC_ADMIN_API_URL

    if (!baseURL) {
        throw new Error('NEXT_PUBLIC_ADMIN_API_URL is empty')
    }

    const axiosInstance = axios.create({
        baseURL: baseURL,
        withCredentials: true,
        paramsSerializer,

        headers: {
            'Content-Type': 'application/json',
            ...(process.env.ADMIN_API_KEY
                ? { Authorization: `bearer ${process.env.ADMIN_API_KEY}` }
                : {}),
        },

        params: {
            populate: 'deep',
            ...params,
        },
    })

    // Добавляем аттрибут locale к запросам на сохранение сущностей.
    axiosInstance.interceptors.request.use((config) => {
        if (config.method === 'post' && config.data?.data && !config.data.data.locale) {
            config.data.data.locale = params.locale
        }

        return config
    })

    return axiosInstance
}
