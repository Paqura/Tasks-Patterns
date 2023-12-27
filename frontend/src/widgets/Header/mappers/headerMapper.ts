import { GetAttributesValues } from '@admin/general-schemas'

import { mapImageMediaFile } from '@/shared/lib/mappers/strapi'
import { THeaderData } from '@/widgets/Header'

export const toDomain = (
    serverHeaderData?: GetAttributesValues<'api::header.header'>,
): THeaderData => {
    return {
        logoImage: mapImageMediaFile(serverHeaderData?.logoImage),
        navItems:
            serverHeaderData?.navItem?.map((item) => ({
                title: item.title || '',
                link: item.link || '/',
                subItems:
                    item.navSubItem?.map((subItem) => ({
                        title: subItem.title || '',
                        description: subItem.description || '',
                        link: subItem.link || '/',
                    })) || [],
            })) || [],
        searchInputPlaceholder: serverHeaderData?.searchInputPlaceholder || '',
    }
}
