import { GetAttributesValues, Response, ResponseCollection } from '@admin/general-schemas'

import { TPublicationState, getUrlWithPublicationState } from '@/shared/lib/publicationState'

import { getClient } from './client'

export const getApi = (locale?: string) => {
    const client = getClient(locale ? { locale } : {})

    return {
        fetchConfig: async () => {
            const response = await client.get<Response<'api::config.config'>>(`/api/config`)
            return response.data.data?.attributes
        },

        fetchHeader: async () => {
            const response = await client.get<Response<'api::header.header'>>(`/api/header`)
            return response.data.data?.attributes
        },

        fetchProducts: async (params: Record<string, unknown> = {}) => {
            const response = await client.get<ResponseCollection<'api::product.product'>>(
                `/api/products`,
                {
                    params: {
                        sort: {
                            order: 'asc',
                        },
                        ...params,
                    },
                },
            )
            return response.data.data?.map((item) => item.attributes)
        },

        fetchProduct: async (id: string, publicationState: TPublicationState) => {
            try {
                const response = await client.get<Response<'api::product.product'>>(
                    getUrlWithPublicationState(`/api/products/${id}`, publicationState),
                )
                return response.data.data?.attributes
            } catch {
                return null
            }
        },

        fetchClients: async () => {
            const response =
                await client.get<ResponseCollection<'api::client.client'>>(`/api/clients`)
            return response.data.data?.map((item) => item.attributes)
        },

        fetchNews: async (page: number = 1, pageSize: number = 5) => {
            const url = `/api/news?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=published%3Adesc`

            const response = await client.get<ResponseCollection<'api::news-item.news-item'>>(url)

            return {
                news: response.data.data?.map((item) => item.attributes),
                pagination: response.data.meta.pagination,
            }
        },

        fetchArticles: async (page: number = 1, pageSize: number = 5) => {
            const url = `/api/analytic-articles?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=published%3Adesc`

            const response =
                await client.get<ResponseCollection<'api::analytic-article.analytic-article'>>(url)

            return {
                articles: response.data.data?.map((item) => item.attributes),
                pagination: response.data.meta.pagination,
            }
        },

        fetchMainPage: async () => {
            const response =
                await client.get<Response<'api::main-page.main-page'>>(`/api/main-page`)
            return response.data.data?.attributes
        },

        fetchAnalyticsPage: async () => {
            const response =
                await client.get<Response<'api::analytics-page.analytics-page'>>(
                    `/api/analytics-page`,
                )
            return response.data.data?.attributes
        },

        fetchNewsPage: async () => {
            const response =
                await client.get<Response<'api::news-page.news-page'>>(`/api/news-page`)
            return response.data.data?.attributes
        },

        fetchAnalyticArticle: async (id: string, publicationState: TPublicationState) => {
            try {
                const response = await client.get<
                    Response<'api::analytic-article.analytic-article'>
                >(getUrlWithPublicationState(`/api/analytic-articles/${id}`, publicationState))
                return response.data.data?.attributes
            } catch {
                return null
            }
        },

        fetchNewsArticle: async (id: string, publicationState: TPublicationState) => {
            try {
                const response = await client.get<Response<'api::news-item.news-item'>>(
                    getUrlWithPublicationState(`/api/news/${id}`, publicationState),
                )
                return response.data.data?.attributes
            } catch {
                return null
            }
        },

        fetchAboutPage: async () => {
            const response =
                await client.get<Response<'api::about-page.about-page'>>(`/api/about-page`)
            return response.data.data?.attributes
        },

        fetchAllProductsPage: async () => {
            const response =
                await client.get<Response<'api::all-products-page.all-products-page'>>(
                    `/api/all-products-page`,
                )
            return response.data.data?.attributes
        },

        fetchWebinarConfig: async () => {
            const response =
                await client.get<Response<'api::webinar-config.webinar-config'>>(
                    `/api/webinar-config`,
                )
            return response.data.data?.attributes
        },

        fetchAnyQuestions: async () => {
            const response =
                await client.get<Response<'api::any-question.any-question'>>(`/api/any-question`)
            return response.data.data?.attributes
        },

        fetchSearchPage: async () => {
            const response =
                await client.get<Response<'api::search-page.search-page'>>(`/api/search-page`)
            return response.data.data?.attributes
        },

        fetchNotFound: async () => {
            const response =
                await client.get<Response<'api::not-found.not-found'>>(`/api/not-found`)
            return response.data.data?.attributes
        },

        fetchFooter: async () => {
            const response = await client.get<Response<'api::footer.footer'>>(`/api/footer`)
            return response.data.data?.attributes
        },

        fetchSpecialPage: async (slug: string, publicationState: TPublicationState) => {
            try {
                const response = await client.get<Response<'api::sp.sp'>>(
                    getUrlWithPublicationState(`/api/sps/${slug}`, publicationState),
                )
                return response.data.data?.attributes
            } catch {
                return null
            }
        },

        createWebinarRequest: async (
            data: GetAttributesValues<'api::webinar-request.webinar-request'>,
        ) => {
            return await client.post<Response<'api::webinar-request.webinar-request'>>(
                `/api/webinar-requests`,
                {
                    data,
                },
            )
        },

        createPilotRequest: async (
            data: GetAttributesValues<'api::pilot-application-request.pilot-application-request'>,
        ) => {
            return await client.post<
                Response<'api::pilot-application-request.pilot-application-request'>
            >(`/api/pilot-application-requests`, {
                data,
            })
        },

        createPartnershipRequest: async (
            data: GetAttributesValues<'api::partnership-request.partnership-request'>,
        ) => {
            return await client.post<Response<'api::partnership-request.partnership-request'>>(
                `/api/partnership-requests`,
                {
                    data,
                },
            )
        },

        createFeedbackRequest: async (
            data: GetAttributesValues<'api::feedback-request.feedback-request'>,
        ) => {
            return await client.post<Response<'api::feedback-request.feedback-request'>>(
                `/api/feedback-requests`,
                {
                    data,
                },
            )
        },

        createSpecialPageInviteRequest: async (
            data: GetAttributesValues<'api::special-pages-invites-request.special-pages-invites-request'>,
        ) => {
            return await client.post<
                Response<'api::special-pages-invites-request.special-pages-invites-request'>
            >(`/api/special-pages-invites-requests`, {
                data,
            })
        },
    }
}

export type TStrapiApi = ReturnType<typeof getApi>
