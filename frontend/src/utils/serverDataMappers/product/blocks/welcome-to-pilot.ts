import { GetAttributesValues } from '@admin/general-schemas'

import { TWelcomeToPilotBlockData } from '@/components/ProductPage/components/WelcomeToPilotBlock'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

type TBackendTasksBlockData = Extract<
    Exclude<GetAttributesValues<'api::product.product'>['blocks'], undefined>[0],
    { __component: 'product.welcome-to-pilot-block' }
>

export const mapWelcomeToPilotBlockServerData = (
    block: TBackendTasksBlockData
): TWelcomeToPilotBlockData => {
    return {
        title: block.title || '',
        description: block.description || '',
        buttonText: block.buttonText || '',
        image: mapImageMediaFile(block.image),
    }
}
