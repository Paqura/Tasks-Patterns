import { GetAttributesValues } from '@admin/general-schemas'

import { TWelcomeToPilotBlockData } from '@/components/ProductPage/components/WelcomeToPilotBlock'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

type TBackendTasksBlockData = Extract<
    Exclude<GetAttributesValues<'api::product.product'>['blocks'], undefined>[0],
    { __component: 'product.welcome-to-pilot-block' }
>

export const mapWelcomeToPilotBlockServerData = (
    block: TBackendTasksBlockData,
): TWelcomeToPilotBlockData => {
    return {
        title: block.title || '',
        description: block.description || '',
        button: block.button
            ? {
                  text: block.button.text || '',
                  link: block.button.link || '',
                  targetBlank: block.button.targetBlank || false,
              }
            : null,
        image: mapImageMediaFile(block.image),
    }
}
