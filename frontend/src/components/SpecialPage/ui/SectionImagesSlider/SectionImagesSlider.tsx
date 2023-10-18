import { TThemeMode } from '@/components/SpecialPage'
import { ImagesSlider } from '@/components/SpecialPage/ui/ImagesSlider'
import type { TSlides } from '@/components/SpecialPage/ui/ImagesSlider'
import { SectionThemed } from '@/components/SpecialPage/ui/SectionThemed'

import styles from './index.module.scss'

export type TBlockSlider = {
    type: 'slider'
    theme: TThemeMode
    slides: TSlides
}

type TSectionImagesSliderProps = {
    id: string
    data: TBlockSlider
}

export const SectionImagesSlider = ({ id, data }: TSectionImagesSliderProps) => {
    const { slides, theme } = data

    return (
        <SectionThemed theme={theme} id={id}>
            <ImagesSlider slides={slides} scrollAreaClassName={styles.sliderScrollArea} />
        </SectionThemed>
    )
}
