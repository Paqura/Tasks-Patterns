import { Response, ResponseCollection } from '@admin/general-schemas'
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
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Content-Type': 'application/json' },
        paramsSerializer,
        params: {
            populate: '*',
        },
    })
    return axiosInstance
}

export const adminClient = getClient()

export const fetchConfig = async () => {
    const response = await adminClient.get<Response<'api::config.config'>>(`/api/config`)
    return response.data.data?.attributes
}

export const fetchProducts = async () => {
    const response = await adminClient.get<ResponseCollection<'api::product.product'>>(
        `/api/products`
    )
    return response.data.data?.map((item) => item.attributes)
}

export const fetchClients = async () => {
    const response = await adminClient.get<ResponseCollection<'api::client.client'>>(`/api/clients`)
    return response.data.data?.map((item) => item.attributes)
}
