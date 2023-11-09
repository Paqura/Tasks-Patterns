import { GetAttributesValues } from '@admin/general-schemas'

import { TProductCard } from '@/components/ProductCard'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

export const mapProductCardServerData = (
    product: GetAttributesValues<'api::product.product'>,
): TProductCard => {
    return {
        title: product.title || '',
        description: product.subtitle,
        icon: mapImageMediaFile(product.icon) || { src: '' },
        href: product.slug || '',
    }
}
