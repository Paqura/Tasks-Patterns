import { TImage } from '@/types'

import { TFaqBlockData } from './ui/FaqBlock'
import { TFilesBlockData } from './ui/FilesBlock'
import { TImagedCardsGridBlockData } from './ui/ImagedCardsGridBlock'
import { TImagesSliderBlockData } from './ui/ImagesSliderBlock'
import { TOtherProductsBlockData } from './ui/OtherProductsBlock'
import { TOverviewBlockData } from './ui/OverviewBlock'
import { TProductTasksBlockData } from './ui/TasksBlock'
import { TWelcomeToPilotBlockData } from './ui/WelcomeToPilotBlock'

export type TSectionCardParams = {
    sectionId: string
}

export type TProductsBlockData =
    | ({
          type: 'tasks'
          data: TProductTasksBlockData
      } & TSectionCardParams)
    | ({
          type: 'imaged-cards-grid'
          data: TImagedCardsGridBlockData
      } & TSectionCardParams)
    | ({
          type: 'images-slider'
          data: TImagesSliderBlockData
      } & TSectionCardParams)
    | ({
          type: 'faq'
          data: TFaqBlockData
      } & TSectionCardParams)
    | {
          type: 'welcome-to-pilot'
          data: TWelcomeToPilotBlockData
      }
    | ({
          type: 'files'
          data: TFilesBlockData
      } & TSectionCardParams)
    | ({
          type: 'other-products'
          data: TOtherProductsBlockData
      } & TSectionCardParams)
    | ({
          type: 'overview'
          data: TOverviewBlockData
      } & TSectionCardParams)

export type TProductData = {
    title: string
    subtitle?: string
    logo: TImage
    bannerImage: TImage | null
    blocks: TProductsBlockData[]
}
