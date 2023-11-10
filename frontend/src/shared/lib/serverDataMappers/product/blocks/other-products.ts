import { GetAttributesValues } from '@admin/general-schemas'

import { TOtherProductsBlockData } from '@/screens/product/ui/OtherProductsBlock'
import { mapProductCardServerData } from '@/shared/lib/serverDataMappers/product/product-card'

type TBackendProductsBlockData = Extract<
    Exclude<GetAttributesValues<'api::product.product'>['blocks'], undefined>[0],
    { __component: 'product.other-products-block' }
>

export const mapOtherProductsBlockServerData = (
    block: TBackendProductsBlockData,
): TOtherProductsBlockData => {
    return {
        title: block.title || '',
        description: block.description,
        items: block.products?.data?.map((p) => mapProductCardServerData(p.attributes)) || [],
    }
}
