import cn from 'classnames'
import Image from 'next/image'
import 'swiper/css'
import { Controller } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { SliderButtons, getDisableStatus } from '@/shared/ui/common/SliderButtons'
import { Text } from '@/shared/ui/common/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'
import { useImagesSlider } from './lib/useImagesSlider'

export type TSlide = { image: TImage; caption?: string }

type TImagesSliderProps = {
    classes?: TClasses<'root' | 'scrollArea'>
    slides: TSlide[]
}

export const ImagesSlider = ({ classes, slides }: TImagesSliderProps) => {
    const {
        activeSlideIndex,
        controlledSwiper,
        handleControlClick,
        setActiveSlideIndex,
        setControlledSwiper,
    } = useImagesSlider()

    const hasControls = slides.length > 1

    return (
        <div className={cn(styles.slider, classes?.root)}>
            {hasControls && (
                <div className={styles.controlsBlock}>
                    <SliderButtons
                        classes={{ root: styles.moveButtons }}
                        disable={getDisableStatus({
                            next: activeSlideIndex >= slides.length - 1,
                            prev: activeSlideIndex === 0,
                        })}
                        onClick={handleControlClick}
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
                                                    }

                                                    if (isPrev) {
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
