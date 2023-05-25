import { TImage } from '@/types'

import { TFaqBlockData } from './components/FaqBlock'
import { TImagedCardsGridBlockData } from './components/ImagedCardsGridBlock'
import { TImagesSliderBlockData } from './components/ImagesSliderBlock'
import { TProductTasksBlockData } from './components/TasksBlock'

export type TProductsBlockData = { sectionId: string } & (
    | {
          type: 'tasks'
          data: TProductTasksBlockData
      }
    | {
          type: 'imaged-cards-grid'
          data: TImagedCardsGridBlockData
      }
    | {
          type: 'images-slider'
          data: TImagesSliderBlockData
      }
    | {
          type: 'faq'
          data: TFaqBlockData
      }
)

export type TProductData = {
    title: string
    subtitle?: string
    logo: TImage
    bannerImage: TImage
    blocks: TProductsBlockData[]
}
