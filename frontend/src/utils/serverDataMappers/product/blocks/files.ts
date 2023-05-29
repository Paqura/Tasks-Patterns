import { GetAttributesValues, MediaAttributeContent } from '@admin/general-schemas'

import { TFilesBlockData } from '@/components/ProductPage/components/FilesBlock'
import { mapFilesServerData } from '@/utils/serverDataMappers/media'

type TBackendTasksBlockData = Extract<
    Exclude<GetAttributesValues<'api::product.product'>['blocks'], undefined>[0],
    { __component: 'product.files-block' }
>

export const mapFilesBlockServerData = (block: TBackendTasksBlockData): TFilesBlockData => {
    return {
        title: block.title || '',
        description: block.description || '',
        files: mapFilesServerData(block.files as MediaAttributeContent<'files', true> | undefined),
    }
}
