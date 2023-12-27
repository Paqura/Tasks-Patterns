import { GetAttributesValues } from '@admin/general-schemas'

import { TProductsBlockData } from '@/screens/home/ui/Products'
import { mapImageMediaFile } from '@/shared/lib/mappers/strapi'
import { TProductCard } from '@/shared/ui/project/ProductCard'

type TBackendBlockData = Extract<
    Exclude<GetAttributesValues<'api::main-page.main-page'>['blocks'], undefined>[0],
    { __component: 'main.products-block' }
>

const mapClients = (clients: GetAttributesValues<'api::client.client'>[]) =>
    clients.map((client) => ({
        name: client.name || '',
        logo: mapImageMediaFile(client.logo) || { src: '' },
    }))

const mapProduct = (product: GetAttributesValues<'api::product.product'>): TProductCard => {
    return {
        title: product.title || '',
        description: product.subtitle,
        icon: mapImageMediaFile(product.icon) || { src: '' },
        href: product.slug || '',
    }
}

export const mapProductsBlockServerData = ({
    block,
    products,
    clients,
}: {
    block: TBackendBlockData
    products: GetAttributesValues<'api::product.product'>[]
    clients: GetAttributesValues<'api::client.client'>[]
}): TProductsBlockData => {
    return {
        sectionId: block.sectionId || '',
        title: block.title || '',
        description: block.description,
        allProductsLinkText: block.allProductsLinkText || 'All products',
        products: products?.map(mapProduct) || [],
        clients: block.clients && {
            title: block.clients.title || '',
            description: block.clients.description || '',
            clientsList: mapClients(clients ?? []),
        },
    }
}
