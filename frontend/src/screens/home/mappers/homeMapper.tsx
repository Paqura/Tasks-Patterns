import { GetAttributesValues } from '@admin/general-schemas'

import { THomeScreenBlocksData, THomeScreenData } from '@/screens/home'
import { mapVideoMediaFile } from '@/shared/lib/mappers/strapi'

import { mapAdvantagesBlockServerData } from './blocks/advantages'
import { mapAnalyticsBlockServerData } from './blocks/analytics'
import { mapNewsBlockServerData } from './blocks/news'
import { mapProductsBlockServerData } from './blocks/products'
import { mapToolsBlockServerData } from './blocks/tools'

const mapMainPageBlocksServerData = ({
    blocks = [],
    products,
    clients,
    articles,
    news,
}: {
    blocks: GetAttributesValues<'api::main-page.main-page'>['blocks']
    products: GetAttributesValues<'api::product.product'>[]
    clients: GetAttributesValues<'api::client.client'>[]
    articles: GetAttributesValues<'api::analytic-article.analytic-article'>[]
    news: GetAttributesValues<'api::news-item.news-item'>[]
}): THomeScreenBlocksData[] => {
    return blocks.map<THomeScreenBlocksData>((block) => {
        switch (block.__component) {
            case 'main.advantages-block':
                return {
                    type: 'advantages',
                    data: mapAdvantagesBlockServerData(block),
                }

            case 'main.tools-block':
                return {
                    type: 'tools',
                    data: mapToolsBlockServerData(block),
                }

            case 'main.products-block':
                return {
                    type: 'products',
                    data: mapProductsBlockServerData({
                        block,
                        products,
                        clients,
                    }),
                }
            case 'main.analytics-block':
                return {
                    type: 'analytics',
                    data: mapAnalyticsBlockServerData({
                        block,
                        articles,
                    }),
                }
            case 'main.news-block':
                return {
                    type: 'news',
                    data: mapNewsBlockServerData({
                        block,
                        news,
                    }),
                }

            default:
                throw new Error('Unexpected block')
        }
    })
}

export const toDomain = ({
    mainPage,
    products,
    clients,
    articles,
    news,
}: {
    mainPage?: GetAttributesValues<'api::main-page.main-page'>
    products: GetAttributesValues<'api::product.product'>[]
    clients: GetAttributesValues<'api::client.client'>[]
    articles: GetAttributesValues<'api::analytic-article.analytic-article'>[]
    news: GetAttributesValues<'api::news-item.news-item'>[]
}): Pick<THomeScreenData, 'headingBlock' | 'blocks' | 'contactsAnchorText'> => {
    return {
        headingBlock: {
            video: mapVideoMediaFile(mainPage?.headingVideo),
            title: mainPage?.title || '',
            subtitle: mainPage?.subtitle,
            contactButtonText: mainPage?.contactButtonText || 'Contact us',
        },
        blocks: mapMainPageBlocksServerData({
            blocks: mainPage?.blocks,
            products,
            clients,
            articles,
            news,
        }),
        contactsAnchorText: mainPage?.contactsAnchorText || 'Contact',
    }
}