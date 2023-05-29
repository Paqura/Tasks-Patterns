import { GetAttributesValues } from '@admin/general-schemas'

import { TAboutPageData } from '@/components/AboutPage'
import { TEmployeeCardData } from '@/components/AboutPage/components/ExpertsSection/components/EmployeeCard'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

const mapEmployeeServerData = (
    serverEmployeeData: GetAttributesValues<'about.employee'>
): TEmployeeCardData => {
    return {
        photo: mapImageMediaFile(serverEmployeeData.photo) || { src: '' },
        name: serverEmployeeData.name || '',
        roles: serverEmployeeData.roles || '',
    }
}

type TReducedAboutPageData = Omit<TAboutPageData, 'seo' | 'headerData'>

export const mapAboutPageServerData = (
    serverAboutPageData?: GetAttributesValues<'api::about-page.about-page'>
): TReducedAboutPageData => {
    return {
        headingSectionData: {
            title: serverAboutPageData?.title || '',
            description: serverAboutPageData?.description || '',
        },
        expertsSectionData: {
            title: serverAboutPageData?.expertsSectionTitle || '',
            description: serverAboutPageData?.expertsSectionDescription || '',
            managersBlockTitle: serverAboutPageData?.expertsSectionManagersBlockTitle || '',
            managersList:
                serverAboutPageData?.expertsSectionManagersList?.map(mapEmployeeServerData) || [],
            expertsBlockTitle: serverAboutPageData?.expertsSectionExpertsBlockTitle || '',
            expertsList:
                serverAboutPageData?.expertsSectionExpertsList?.map(mapEmployeeServerData) || [],
        },
    }
}
