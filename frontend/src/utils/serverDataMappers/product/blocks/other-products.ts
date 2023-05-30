import { GetAttributesValues } from '@admin/general-schemas'

import { TOtherProductsBlockData } from '@/components/ProductPage/components/OtherProductsBlock'
import { mapProductCardServerData } from '@/utils/serverDataMappers/product/product-card'

type TBackendProductsBlockData = Extract<
    Exclude<GetAttributesValues<'api::product.product'>['blocks'], undefined>[0],
    { __component: 'product.other-products-block' }
>

export const mapOtherProductsBlockServerData = (
    block: TBackendProductsBlockData,
    products?: GetAttributesValues<'api::product.product'>[]
): TOtherProductsBlockData => {
    return {
        title: block.title || '',
        description: block.description,
        items: products?.map(mapProductCardServerData) || [],
    }
}
