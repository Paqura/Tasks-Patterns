import { GetAttributesValues } from '@admin/general-schemas'

import { TErrorData } from '@/shared/ui/project/Error'

export const mapNotFoundServerData = (
    serverNotFoundData?: GetAttributesValues<'api::not-found.not-found'>,
): TErrorData => {
    return {
        title: serverNotFoundData?.title || '',
        description: serverNotFoundData?.description || '',
    }
}
