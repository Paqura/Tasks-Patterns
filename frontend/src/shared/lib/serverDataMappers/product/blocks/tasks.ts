import { GetAttributesValues } from '@admin/general-schemas'

import { TProductTasksBlockData } from '@/screens/product/ui/TasksBlock'
import { mapImagedCardServerData } from '@/shared/lib/serverDataMappers/product/imaged-card'

type TBackendTasksBlockData = Extract<
    Exclude<GetAttributesValues<'api::product.product'>['blocks'], undefined>[0],
    { __component: 'product.product-tasks-block' }
>

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
