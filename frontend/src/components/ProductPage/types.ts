import { TImage } from '@/types'

export type TProductsBlockData = { sectionId: string } & {
    type: 'tasks'
    data: TProductTasksBlockData
}

export type TProductTasksBlockData = {
    title: string
    description?: string
    tasks: { title: string; description?: string; image: TImage }[]
    statistics?: {
        title: string
        values: { value: string; label: string }[]
    }
}

export type TProductData = {
    title: string
    subtitle?: string
    logo: TImage
    bannerImage: TImage
    blocks: TProductsBlockData[]
}
