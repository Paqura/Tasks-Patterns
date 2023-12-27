import { GetAttributesValues } from '@admin/general-schemas'

import { TOtherProductsBlockData } from '@/screens/product/ui/OtherProductsBlock'
import { mapImageMediaFile } from '@/shared/lib/mappers/strapi'
import { TProductCard } from '@/shared/ui/project/ProductCard'

const mapProduct = (product: GetAttributesValues<'api::product.product'>): TProductCard => {
    return {
        title: product.title || '',
        description: product.subtitle,
        icon: mapImageMediaFile(product.icon) || { src: '' },
        href: product.slug || '',
    }
}

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
        items: block.products?.data?.map((p) => mapProduct(p.attributes)) || [],
    }
}
