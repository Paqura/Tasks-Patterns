import cn from 'classnames'
import React, { PropsWithChildren, useLayoutEffect, useState } from 'react'
import 'swiper/css'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './index.module.scss'

type TAutoCarouselProps = {
    className?: string
}

const SLIDE_LIFETIME = 4000

export const AutoCarousel = ({ className, children }: PropsWithChildren<TAutoCarouselProps>) => {
    const [animationStarted, setAnimationStarted] = useState<boolean>(false)

    const slidesCount = React.Children.count(children)

    useLayoutEffect(() => {
        setTimeout(() => {
            requestAnimationFrame(() => {
                setAnimationStarted(true)
            })
        }, 0)
    }, [])

    const pagination =
        slidesCount > 1
            ? {
                  clickable: true,
                  renderBullet: function (_index: number, className: string) {
                      return `
                        <span class="${cn(className, styles.bullet)}">
                            <span
                                class="${styles.bulletProgress}"
                                style="transition-duration: ${SLIDE_LIFETIME}ms"
                            ></span>
                        </span>
                    `
                  },
              }
            : undefined

    return (
        <Swiper
            className={cn(className, styles.carousel, {
                [styles.animationStarted]: animationStarted,
            })}
            loop
            autoplay={{
                delay: SLIDE_LIFETIME,
            }}
            pagination={pagination}
            modules={[Autoplay, Pagination]}
        >
            {React.Children.map(children, (slide) => (
                <SwiperSlide
                    className={cn(styles.slide, { [styles.slide_hidden]: !animationStarted })}
                >
                    {slide}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
