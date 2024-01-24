import { useState } from 'react'
import { SwiperClass } from 'swiper/react'

import { TClickDirection } from '@/shared/ui/common/SliderButtons'

export const useImagesSlider = () => {
    const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(null)
    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)

    const handleControlClick = (dir: TClickDirection) => {
        if (!controlledSwiper) return

        const actionsMap: Record<TClickDirection, VoidFunction> = {
            next: () => controlledSwiper.slideNext(),
            prev: () => controlledSwiper.slidePrev(),
        }

        actionsMap[dir]()
    }

    return {
        activeSlideIndex,
        controlledSwiper,

        setControlledSwiper,
        setActiveSlideIndex,
        handleControlClick,
    }
}
