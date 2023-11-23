import { TThemeMode } from '@/screens/special'
import type { TSlides } from '@/screens/special/ui/ImagesSlider'
import { ImagesSlider } from '@/screens/special/ui/ImagesSlider'
import { SectionThemed } from '@/screens/special/ui/SectionThemed'

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
