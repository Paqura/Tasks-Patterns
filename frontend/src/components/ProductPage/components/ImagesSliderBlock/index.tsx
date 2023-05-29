import React from 'react'

import { ImagesSlider, TSlide } from '@/components/ui/ImagesSlider'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'

import styles from './index.module.scss'

export type TImagesSliderBlockData = {
    title: string
    description?: string
    slides: TSlide[]
}

export const ImagesSliderBlock: React.FC<{
    data: TImagesSliderBlockData
    sectionId: string
    number: number
}> = ({ data, sectionId, number }) => {
    return (
        <PageSectionCard mode={'dark'} sectionId={sectionId}>
            <PageSectionCardHeader
                number={number}
                title={data.title}
                description={data.description}
            />
            <ImagesSlider slides={data.slides} scrollAreaClassName={styles.sliderScrollArea} />
        </PageSectionCard>
    )
}
