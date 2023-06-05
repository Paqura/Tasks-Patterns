import { GetAttributesValues } from '@admin/general-schemas'

import { TAnyQuestionsData } from '@/components/AnyQuestions'
import { getSelectProductOptionsServerData } from '@/utils/serverDataMappers/product'

export const mapAnyQuestionsServerData = (
    serverData?: GetAttributesValues<'api::any-question.any-question'>,
    products?: GetAttributesValues<'api::product.product'>[]
): TAnyQuestionsData => {
    return {
        selectProductOptions: getSelectProductOptionsServerData(products),
        title: serverData?.title || '',
        description: serverData?.description || '',
        feedback: {
            title: serverData?.feedback?.title || '',
            description: serverData?.feedback?.description || '',
            fieldName: serverData?.feedback?.fieldName || '',
            fieldPhone: serverData?.feedback?.fieldPhone || '',
            fieldEmail: serverData?.feedback?.fieldEmail || '',
            fieldComment: serverData?.feedback?.fieldComment || '',
            checkboxConsentsTerms: serverData?.feedback?.checkboxConsentsTerms || '',
            checkboxSubscription: serverData?.feedback?.checkboxSubscription || '',
            buttonSubmit: serverData?.feedback?.buttonSubmit || '',
            successTitle: serverData?.feedback?.successTitle || '',
            successDescription: serverData?.feedback?.successDescription || '',
        },
        partnership: {
            title: serverData?.partnership?.title || '',
            description: serverData?.partnership?.description || '',
            fieldName: serverData?.partnership?.fieldName || '',
            fieldCompanyName: serverData?.partnership?.fieldCompanyName || '',
            fieldPhone: serverData?.partnership?.fieldPhone || '',
            fieldEmail: serverData?.partnership?.fieldEmail || '',
            fieldComment: serverData?.partnership?.fieldComment || '',
            checkboxConsentsTerms: serverData?.partnership?.checkboxConsentsTerms || '',
            checkboxSubscription: serverData?.partnership?.checkboxSubscription || '',
            buttonSubmit: serverData?.partnership?.buttonSubmit || '',
            successTitle: serverData?.partnership?.successTitle || '',
            successDescription: serverData?.partnership?.successDescription || '',
        },
        pilotApplication: {
            title: serverData?.pilotApplication?.title || '',
            description: serverData?.pilotApplication?.description || '',
            fieldProduct: serverData?.pilotApplication?.fieldProduct || '',
            fieldName: serverData?.pilotApplication?.fieldName || '',
            fieldCompanyName: serverData?.pilotApplication?.fieldCompanyName || '',
            fieldPhone: serverData?.pilotApplication?.fieldPhone || '',
            fieldEmail: serverData?.pilotApplication?.fieldEmail || '',
            fieldComment: serverData?.pilotApplication?.fieldComment || '',
            checkboxConsentsTerms: serverData?.pilotApplication?.checkboxConsentsTerms || '',
            checkboxSubscription: serverData?.pilotApplication?.checkboxSubscription || '',
            buttonSubmit: serverData?.pilotApplication?.buttonSubmit || '',
            successTitle: serverData?.pilotApplication?.successTitle || '',
            successDescription: serverData?.pilotApplication?.successDescription || '',
        },
    }
}
