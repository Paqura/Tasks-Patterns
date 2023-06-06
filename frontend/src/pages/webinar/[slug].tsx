import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'
import React from 'react'

import EventArticlePage from '@/components/EventArticlePage'
import {
    fetchConfig,
    fetchFooter,
    fetchHeader,
    fetchNewsArticle,
    fetchProducts,
    fetchWebinarConfig,
} from '@/utils/adminApi'
import {
    mapEventArticleServerData,
    mapWebinarConfigServerData,
} from '@/utils/serverDataMappers/event-article'
import { mapFooterServerData } from '@/utils/serverDataMappers/footer'
import { mapHeaderServerData } from '@/utils/serverDataMappers/header'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    header?: GetAttributesValues<'api::header.header'>
    newsItem: GetAttributesValues<'api::news-item.news-item'>
    webinarConfig?: GetAttributesValues<'api::webinar-config.webinar-config'>
    products?: GetAttributesValues<'api::product.product'>[]
    footer?: GetAttributesValues<'api::footer.footer'>
}
export const getServerSideProps: GetServerSideProps<TServerSideProps, { slug: string }> = async ({
    params,
}) => {
    if (!params?.slug) {
        return {
            notFound: true,
        }
    }
    const [newsItem, config, header, webinarConfig, products, footer] = await Promise.all([
        fetchNewsArticle(params.slug),
        fetchConfig(),
        fetchHeader(),
        fetchWebinarConfig(),
        fetchProducts(),
        fetchFooter(),
    ])

    if (!newsItem) {
        return {
            notFound: true,
        }
    }

    if (!newsItem?.isEvent) {
        return {
            redirect: {
                destination: `/news/${params.slug}`,
                permanent: true,
            },
        }
    }

    return {
        props: {
            newsItem,
            config,
            header,
            webinarConfig,
            products,
            footer,
        },
    }
}
type TProps = TServerSideProps

export default function EventArticleItem(props: TProps) {
    const { article, completedVideo, calendar, isCompleted, slug, eventHasAllFormData } =
        mapEventArticleServerData(props.newsItem)
    const eventConfig = mapWebinarConfigServerData(props.webinarConfig)
    const footerData = mapFooterServerData(props.footer, props.products)

    return (
        <EventArticlePage
            seo={props.config?.seo || {}}
            headerData={mapHeaderServerData(props.header)}
            footerData={footerData}
            slug={slug}
            eventArticleData={article}
            eventConfigData={eventConfig}
            eventCompletedVideo={completedVideo}
            eventCalendar={calendar}
            eventIsCompleted={isCompleted}
            eventHasAllFormData={eventHasAllFormData}
        />
    )
}
