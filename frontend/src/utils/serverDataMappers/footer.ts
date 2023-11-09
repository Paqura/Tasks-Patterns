import { GetAttributesValues } from '@admin/general-schemas'

import { TFooterData } from '@/components/Footer'
import { TFooterNavItem } from '@/types'

const mapNavItems = (items: GetAttributesValues<'footer.nav-block-item'>[]): TFooterNavItem[] =>
    items.map((item) => ({
        name: item?.name || '',
        link: item?.link || '',
    }))

const mapProductsToNavItems = (
    products: GetAttributesValues<'api::product.product'>[],
): TFooterNavItem[] =>
    products.map((item) => ({
        name: item?.title || '',
        link: `/products/${item?.slug}`,
    }))

export const mapFooterServerData = (
    serverFooterData?: GetAttributesValues<'api::footer.footer'>,
    serverProductsData?: GetAttributesValues<'api::product.product'>[],
): TFooterData => {
    return {
        title: serverFooterData?.title || '',
        copyright: serverFooterData?.copyright || '',
        products: {
            title: serverFooterData?.productsTitle || '',
            navItems: mapProductsToNavItems(serverProductsData || []),
        },
        company: {
            title: serverFooterData?.company?.title || '',
            navItems: mapNavItems(serverFooterData?.company?.items || []),
        },
        social: {
            title: serverFooterData?.social?.title || '',
            navItems: mapNavItems(serverFooterData?.social?.items || []),
        },
    }
}
