import { GetAttributesValues } from '@admin/general-schemas'

import { TOverviewBlockData } from '@/screens/product/ui/OverviewBlock'

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
