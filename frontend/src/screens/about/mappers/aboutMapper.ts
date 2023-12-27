import { GetAttributesValues } from '@admin/general-schemas'

import { TAboutScreenData } from '@/screens/about'
import { TEmployeeCardData } from '@/screens/about/ui/ExpertsSection/ui/EmployeeCard'
import { THistoryItemData } from '@/screens/about/ui/HistorySection/ui/HistoryItem'
import { mapImageMediaFile } from '@/shared/lib/mappers/strapi'

type TReducedAboutPageData = Omit<
    TAboutScreenData,
    'seo' | 'headerData' | 'footerData' | 'anyQuestions'
>

const mapEmployee = (
    serverEmployeeData: GetAttributesValues<'about.employee'>,
): TEmployeeCardData => {
    return {
        photo: mapImageMediaFile(serverEmployeeData.photo) || { src: '' },
        name: serverEmployeeData.name || '',
        roles: serverEmployeeData.roles || '',
    }
}

const mapHistoryItem = (
    serverHistoryItemData: GetAttributesValues<'about.history-item'>,
): THistoryItemData => {
    return {
        date: serverHistoryItemData.date || '',
        number: serverHistoryItemData.number || '',
        numberDescription: serverHistoryItemData.numberDescription || '',
        achievements: serverHistoryItemData.achievements?.map(({ value }) => value || '') || [],
    }
}

export const toDomain = (
    serverAboutPageData?: GetAttributesValues<'api::about-page.about-page'>,
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
            managersList: serverAboutPageData?.expertsSectionManagersList?.map(mapEmployee) || [],
            isExpertsBlockVisible: Boolean(serverAboutPageData?.showExpertsSectionExpertsBlock),
            expertsBlockTitle: serverAboutPageData?.expertsSectionExpertsBlockTitle || '',
            expertsList: serverAboutPageData?.expertsSectionExpertsList?.map(mapEmployee) || [],
        },
        historySectionData: {
            isVisible: Boolean(serverAboutPageData?.showHistorySection),
            title: serverAboutPageData?.historySectionTitle || '',
            description: serverAboutPageData?.historySectionDescription || '',
            historyItems:
                serverAboutPageData?.historySectionHistoryItems?.map(mapHistoryItem) || [],
        },
    }
}
