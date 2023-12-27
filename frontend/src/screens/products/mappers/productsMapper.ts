import { GetAttributesValues } from '@admin/general-schemas'

import { TProductsScreenData } from '@/screens/products'
import { mapImageMediaFile } from '@/shared/lib/mappers/strapi'
import { TProductCard } from '@/shared/ui/project/ProductCard'

export const heading = (
    serverAboutPageData?: GetAttributesValues<'api::all-products-page.all-products-page'>,
): Pick<TProductsScreenData, 'headingSectionData'> => {
    return {
        headingSectionData: {
            title: serverAboutPageData?.title || '',
            description: serverAboutPageData?.description || '',
        },
    }
}

export const toDomain = (products: GetAttributesValues<'api::product.product'>[]): TProductCard[] =>
    products.map((product) => ({
        title: product.title || '',
        description: product.subtitle,
        icon: mapImageMediaFile(product.icon) || { src: '' },
        href: product.slug || '',
    }))
