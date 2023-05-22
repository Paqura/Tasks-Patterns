import { GetAttributesValues } from '@admin/general-schemas'

import { THeaderData } from '@/components/Header'

export const mapHeaderServerData = (
    serverHeaderData?: GetAttributesValues<'api::header.header'>
): THeaderData => {
    return {
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
    }
}
