import cn from 'classnames'
import map from 'lodash/map'
import { useState } from 'react'
import 'swiper/css'
import { Controller } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

import styles from './index.module.scss'
import { Slide, TSlide } from './ui/Slide'

export type TSlides = TSlide[]

type TImagesSliderProps = {
    className?: string
    scrollAreaClassName?: string
    slides: TSlide[]
}

export const ImagesSlider = ({ className, slides, scrollAreaClassName }: TImagesSliderProps) => {
    const [controlledSwiper, setControlledSwiper] = useState<TNullable<SwiperClass>>(null)

    return (
        <div className={cn(styles.slider, className)}>
            <div className={scrollAreaClassName}>
                <Swiper
                    slidesPerView={1}
                    centeredSlides={true}
                    direction="horizontal"
                    onSwiper={setControlledSwiper}
                    modules={[Controller]}
                    className={styles.swiperExtraClass}
                >
                    {map(slides, (slide, idx) => (
                        <SwiperSlide key={idx}>
                            {({ isNext, isPrev, isActive }) => {
                                return (
                                    <Slide
                                        key={idx}
                                        active={isActive}
                                        prev={isPrev}
                                        next={isNext}
                                        onSlideNext={controlledSwiper?.slideNext}
                                        onSlidePrev={controlledSwiper?.slidePrev}
                                        data={slide}
                                    />
                                )
                            }}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}
