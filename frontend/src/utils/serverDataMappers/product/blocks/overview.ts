import { GetAttributesValues } from '@admin/general-schemas'

import { TOverviewBlockData } from '@/components/ProductPage/components/OverviewBlock'

type TBackendProductsBlockData = Extract<
    Exclude<GetAttributesValues<'api::product.product'>['blocks'], undefined>[0],
    { __component: 'product.product-overview-block' }
>

export const mapOverviewBlockServerData = (
    block: TBackendProductsBlockData,
): TOverviewBlockData => {
    return {
        title: block.title || '',
        content: block.content || '',
    }
}
