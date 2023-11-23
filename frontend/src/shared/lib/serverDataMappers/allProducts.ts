import { GetAttributesValues } from '@admin/general-schemas'

import { TProductsScreenData } from '@/screens/products'

export const mapAllProductsPageServerData = (
    serverAboutPageData?: GetAttributesValues<'api::all-products-page.all-products-page'>,
): Pick<TProductsScreenData, 'headingSectionData'> => {
    return {
        headingSectionData: {
            title: serverAboutPageData?.title || '',
            description: serverAboutPageData?.description || '',
        },
    }
}
