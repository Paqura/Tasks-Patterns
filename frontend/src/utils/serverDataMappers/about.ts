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

type TReducedAboutPageData = Omit<
    TAboutPageData,
    'seo' | 'headerData' | 'footerData' | 'anyQuestions'
>

export const mapAboutPageServerData = (
    serverAboutPageData?: GetAttributesValues<'api::about-page.about-page'>
): TReducedAboutPageData => {
    return {
        headingSectionData: {
            title: serverAboutPageData?.title || '',
            description: serverAboutPageData?.description || '',
        },
        expertsSectionData: {
            isVisible: Boolean(serverAboutPageData?.showExpertsSection),
            title: serverAboutPageData?.expertsSectionTitle || '',
            description: serverAboutPageData?.expertsSectionDescription || '',
            isManagersBlockVisible: Boolean(serverAboutPageData?.showExpertsSectionManagersBlock),
            managersBlockTitle: serverAboutPageData?.expertsSectionManagersBlockTitle || '',
            managersList:
                serverAboutPageData?.expertsSectionManagersList?.map(mapEmployeeServerData) || [],
            isExpertsBlockVisible: Boolean(serverAboutPageData?.showExpertsSectionExpertsBlock),
            expertsBlockTitle: serverAboutPageData?.expertsSectionExpertsBlockTitle || '',
            expertsList:
                serverAboutPageData?.expertsSectionExpertsList?.map(mapEmployeeServerData) || [],
        },
        historySectionData: {
            isVisible: Boolean(serverAboutPageData?.showHistorySection),
            title: serverAboutPageData?.historySectionTitle || '',
            description: serverAboutPageData?.historySectionDescription || '',
            historyItems:
                serverAboutPageData?.historySectionHistoryItems?.map(mapHistoryItemServerData) ||
                [],
        },
    }
}
