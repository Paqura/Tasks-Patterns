import { GetAttributesValues } from '@admin/general-schemas'

import { TAllProductsPageData } from '@/components/AllProductsPage'

export const mapAllProductsPageServerData = (
    serverAboutPageData?: GetAttributesValues<'api::all-products-page.all-products-page'>,
): Pick<TAllProductsPageData, 'headingSectionData'> => {
    return {
        headingSectionData: {
            title: serverAboutPageData?.title || '',
            description: serverAboutPageData?.description || '',
        },
    }
}
