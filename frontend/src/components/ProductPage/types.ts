import { TImage } from '@/types'

import { TFaqBlockData } from './components/FaqBlock'
import { TFilesBlockData } from './components/FilesBlock'
import { TImagedCardsGridBlockData } from './components/ImagedCardsGridBlock'
import { TImagesSliderBlockData } from './components/ImagesSliderBlock'
import { TOtherProductsBlockData } from './components/OtherProductsBlock'
import { TOverviewBlockData } from './components/OverviewBlock'
import { TProductTasksBlockData } from './components/TasksBlock'
import { TWelcomeToPilotBlockData } from './components/WelcomeToPilotBlock'

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
