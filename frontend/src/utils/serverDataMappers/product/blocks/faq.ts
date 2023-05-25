import { GetAttributesValues } from '@admin/general-schemas'

import { TFaqBlockData } from '@/components/ProductPage/components/FaqBlock'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

type TBackendTasksBlockData = Extract<
    Exclude<GetAttributesValues<'api::product.product'>['blocks'], undefined>[0],
    { __component: 'product.faq-block' }
>

export const mapFaqBlockServerData = (block: TBackendTasksBlockData): TFaqBlockData => {
    return {
        title: block.title || '',
        description: block.description,
        items:
            block.items?.map((item) => ({
                question: item.question || '',
                answer: item?.answer || '',
                icon: mapImageMediaFile(item.icon),
            })) || [],
    }
}
