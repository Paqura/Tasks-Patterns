import { GetAttributesValues } from '@admin/general-schemas'

import { TProductTasksBlockData } from '@/components/ProductPage'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

type TBackendTasksBlockData = Extract<
    Exclude<GetAttributesValues<'api::product.product'>['blocks'], undefined>[0],
    { __component: 'product.product-tasks-block' }
>

export const mapProductTasksBlockData = (block: TBackendTasksBlockData): TProductTasksBlockData => {
    return {
        title: block.title || '',
        description: block.description,
        tasks:
            block.tasks?.map((task) => ({
                title: task.title || '',
                description: task.description || '',
                image: mapImageMediaFile(task.image),
            })) || [],
        statistics:
            block.statisticsValues && block.statisticsValues?.length > 0
                ? {
                      title: block.statisticsTitile || '',
                      values: block.statisticsValues.map((statValue) => ({
                          value: statValue.value || '',
                          label: statValue.label || '',
                      })),
                  }
                : undefined,
    }
}
