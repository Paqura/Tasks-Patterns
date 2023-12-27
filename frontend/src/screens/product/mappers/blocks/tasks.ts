import { GetAttributesValues } from '@admin/general-schemas'

import { TImagedCard } from '../../ui/ImagedCard'
import { TProductTasksBlockData } from '@/screens/product/ui/TasksBlock'
import { mapImageMediaFile } from '@/shared/lib/mappers/strapi'

type TBackendTasksBlockData = Extract<
    Exclude<GetAttributesValues<'api::product.product'>['blocks'], undefined>[0],
    { __component: 'product.product-tasks-block' }
>

type TBackendImagedCardData = GetAttributesValues<'product.imaged-card'>

const mapImagedCardServerData = (data: TBackendImagedCardData): TImagedCard => {
    return {
        title: data.title || '',
        description: data.description || '',
        image: mapImageMediaFile(data.image) || { src: '' },
    }
}

export const mapProductTasksBlockServerData = (
    block: TBackendTasksBlockData,
): TProductTasksBlockData => {
    return {
        title: block.title || '',
        description: block.description,
        tasks: block.tasks?.map(mapImagedCardServerData) || [],
        statistics:
            block.statisticsValues && block.statisticsValues?.length > 0
                ? {
                      title: block.statisticsTitile || '',
                      values: block.statisticsValues.map((statValue) => ({
                          value: statValue.value || '',
                          label: statValue.label || '',
                      })),
                  }
                : null,
    }
}
