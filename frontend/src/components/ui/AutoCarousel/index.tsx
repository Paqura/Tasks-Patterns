import cn from 'classnames'
import React, { useLayoutEffect, useState } from 'react'
import { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './index.module.scss'

type TProps = {
    className?: string
}

const slideLifetime = 4000

export const AutoCarousel: React.FC<React.PropsWithChildren<TProps>> = ({
    className,
    children,
}) => {
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
                  renderBullet: function (index: number, className: string) {
                      return `
                        <span class="${cn(className, styles.bullet)}">
                            <span 
                                class="${styles.bulletProgress}"
                                style="transition-duration: ${slideLifetime}ms"
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
                delay: slideLifetime,
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
