import { GetAttributesValues } from '@admin/general-schemas'

import { TFaqBlockData } from '@/screens/product/ui/FaqBlock'
import { mapImageMediaFile } from '@/shared/lib/mappers/strapi'

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
