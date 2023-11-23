import { GetAttributesValues } from '@admin/general-schemas'

import { mapImageMediaFile } from '@/shared/lib/serverDataMappers/media'
import { TProductCard } from '@/shared/ui/project/ProductCard'

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
