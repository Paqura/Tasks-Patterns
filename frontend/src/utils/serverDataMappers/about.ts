import { GetAttributesValues } from '@admin/general-schemas'

import { TAboutPageData } from '@/components/AboutPage'
import { TEmployeeCardData } from '@/components/AboutPage/components/ExpertsSection/components/EmployeeCard'
import { THistoryItemData } from '@/components/AboutPage/components/HistorySection/components/HistoryItem'
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

const mapHistoryItemServerData = (
    serverHistoryItemData: GetAttributesValues<'about.history-item'>
): THistoryItemData => {
    return {
        date: serverHistoryItemData.date || '',
        number: serverHistoryItemData.number || '',
        numberDescription: serverHistoryItemData.numberDescription || '',
        achievements: serverHistoryItemData.achievements?.map(({ value }) => value || '') || [],
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
        historySectionData: {
            title: serverAboutPageData?.historySectionTitle || '',
            description: serverAboutPageData?.historySectionDescription || '',
            historyItems:
                serverAboutPageData?.historySectionHistoryItems?.map(mapHistoryItemServerData) ||
                [],
        },
    }
}
