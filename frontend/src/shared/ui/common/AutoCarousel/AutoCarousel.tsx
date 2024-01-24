import cn from 'classnames'
import React, { PropsWithChildren } from 'react'
import 'swiper/css'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './index.module.scss'
import { SLIDE_LIFETIME, getPagination } from './lib/pagination'
import { useAutoCarousel } from './lib/useAutoCarousel'

type TAutoCarouselProps = {
    classes?: TClasses<'root' | 'slide'>
}

export const AutoCarousel = ({ classes, children }: PropsWithChildren<TAutoCarouselProps>) => {
    const { animationStarted } = useAutoCarousel()

    const slidesCount = React.Children.count(children)

    const pagination = getPagination({
        slidesCount,
        classes: {
            root: styles.bullet,
            progress: styles.bulletProgress,
        },
    })

    return (
        <Swiper
            className={cn(
                styles.root,
                {
                    [styles.animationStarted]: animationStarted,
                },
                classes?.root,
            )}
            loop
            autoplay={{
                delay: SLIDE_LIFETIME,
            }}
            pagination={pagination}
            modules={[Autoplay, Pagination]}
        >
            {React.Children.map(children, (slide) => (
                <SwiperSlide
                    className={cn(
                        styles.slide,
                        { [styles.slide_hidden]: !animationStarted },
                        classes?.slide,
                    )}
                >
                    {slide}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
