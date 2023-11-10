import { ImagesSlider, TSlide } from '@/shared/ui/common/ImagesSlider'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'

export type TImagesSliderBlockData = {
    title: string
    description?: string
    slides: TSlide[]
}

type TImagesSliderBlockProps = {
    data: TImagesSliderBlockData
    sectionId: string
    number: number
}

export const ImagesSliderBlock = ({ data, sectionId, number }: TImagesSliderBlockProps) => {
    return (
        <PageSection.Card mode={'dark'} sectionId={sectionId}>
            <PageSection.Header number={number} title={data.title} description={data.description} />
            <ImagesSlider slides={data.slides} classes={{ scrollArea: styles.sliderScrollArea }} />
        </PageSection.Card>
    )
}
