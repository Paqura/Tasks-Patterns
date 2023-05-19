import cn from 'classnames'
import React, { useLayoutEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

import styles from './index.module.scss'

type TProps = {
    className?: string
}

const swipeThreshold = 20
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

    return (
        <Carousel
            className={cn(className, styles.carousel)}
            renderIndicator={(onClickHandler, isSelected) => (
                <span className={styles.bullet} onClick={onClickHandler}>
                    <span
                        className={cn(styles.bulletProgress, {
                            [styles.bulletProgress_active]: animationStarted && isSelected,
                        })}
                        style={{ transitionDuration: `${slideLifetime}ms` }}
                    />
                </span>
            )}
            showIndicators={slidesCount > 1}
            showArrows={false}
            showStatus={false}
            infiniteLoop={true}
            emulateTouch={false}
            preventMovementUntilSwipeScrollTolerance={true}
            swipeScrollTolerance={swipeThreshold}
            autoPlay={animationStarted}
            interval={slideLifetime}
            showThumbs={false}
        >
            {
                /**У библиотеки react-responsive-carousel устаревшие тайпинги реакта. В остальном она неплоха */
                React.Children.map(children, (slide) => (
                    <div className={cn(styles.slide, { [styles.slide_hidden]: !animationStarted })}>
                        {slide}
                    </div>
                )) as React.ReactChild[]
            }
        </Carousel>
    )
}
