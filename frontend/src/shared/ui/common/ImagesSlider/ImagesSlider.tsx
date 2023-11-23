import cn from 'classnames'
import Image from 'next/image'
import { useState } from 'react'
import 'swiper/css'
import { Controller } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

import { SliderButtons } from '@/shared/ui/common/SliderButtons'
import { Text } from '@/shared/ui/common/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'

export type TSlide = { image: TImage; caption?: string }

type TImagesSliderProps = {
    classes?: TClasses<'root' | 'scrollArea'>
    slides: TSlide[]
}

export const ImagesSlider = ({ classes, slides }: TImagesSliderProps) => {
    const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(null)
    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)

    const hasControls = slides.length > 1

    return (
        <div className={cn(styles.slider, classes?.root)}>
            {hasControls && (
                <div className={styles.controlsBlock}>
                    <SliderButtons
                        className={styles.moveButtons}
                        disableLeft={activeSlideIndex === 0}
                        disableRight={activeSlideIndex >= slides.length - 1}
                        onLeftClick={() => controlledSwiper?.slidePrev()}
                        onRightClick={() => controlledSwiper?.slideNext()}
                    />
                </div>
            )}

            <div className={classes?.scrollArea}>
                <Swiper
                    slidesPerView={1}
                    centeredSlides={true}
                    direction="horizontal"
                    onSwiper={setControlledSwiper}
                    modules={[Controller]}
                    className={styles.swiperExtraClass}
                    onActiveIndexChange={(swiper) => {
                        setActiveSlideIndex(swiper.activeIndex)
                    }}
                >
                    {slides.map(({ image, caption }, index) => (
                        <SwiperSlide key={index}>
                            {({ isNext, isPrev, isActive }) => {
                                return (
                                    <div
                                        className={cn(styles.slideWrapper, {
                                            [styles.slideWrapper_active]: isActive,
                                            [styles.slideWrapper_prev]: isPrev,
                                            [styles.slideWrapper_next]: isNext,
                                        })}
                                    >
                                        <div className={styles.imageWrapper}>
                                            <Image
                                                className={styles.image}
                                                src={image.src}
                                                width={image.width}
                                                height={image.height}
                                                alt={image.alt || ''}
                                                onClick={() => {
                                                    if (isNext) {
                                                        controlledSwiper?.slideNext()
                                                    } else if (isPrev) {
                                                        controlledSwiper?.slidePrev()
                                                    }
                                                }}
                                            />
                                        </div>

                                        {caption && (
                                            <Text type="postscript" className={styles.caption}>
                                                {caption}
                                            </Text>
                                        )}
                                    </div>
                                )
                            }}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}
