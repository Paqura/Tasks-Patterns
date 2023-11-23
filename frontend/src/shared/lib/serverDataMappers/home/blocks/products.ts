import { GetAttributesValues } from '@admin/general-schemas'

import { TProductsBlockData } from '@/screens/home/ui/Products'
import { mapImageMediaFile } from '@/shared/lib/serverDataMappers/media'
import { mapProductCardServerData } from '@/shared/lib/serverDataMappers/product/product-card'

type TBackendBlockData = Extract<
    Exclude<GetAttributesValues<'api::main-page.main-page'>['blocks'], undefined>[0],
    { __component: 'main.products-block' }
>

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
        products: products?.map(mapProductCardServerData) || [],
        clients: block.clients && {
            title: block.clients.title || '',
            description: block.clients.description || '',
            clientsList:
                clients?.map((client) => ({
                    name: client.name || '',
                    logo: mapImageMediaFile(client.logo) || { src: '' },
                })) || [],
        },
    }
}
