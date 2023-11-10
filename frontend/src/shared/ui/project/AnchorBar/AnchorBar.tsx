import cn from 'classnames'
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/free-mode'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

import { useAnchors } from '@/shared/lib/anchors'
import { PAGE_SECTIONS_ANCHORS_ELEMENT_ID } from '@/shared/lib/constants'
import { useObserver } from '@/shared/lib/helpers'
import { Text } from '@/shared/ui/common/typography/Text'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'

export type TAnchorLink = {
    name: string
    link: string
}

export type TAnchorBarProps = {
    anchors: TAnchorLink[]
    isFloat?: boolean
}

export const AnchorBar = ({ anchors, isFloat = true }: TAnchorBarProps) => {
    const { activeLink, api } = useAnchors()

    const [shadowState, setShadowState] = useState<{ start: boolean; end: boolean }>({
        start: false,
        end: false,
    })
    const [isSticky, setIsSticky] = useState(false)

    const swiperRef = useRef<SwiperClass>()
    const intersectionSensorRef = useRef<HTMLDivElement>(null)

    useObserver(intersectionSensorRef, setIsSticky, isFloat)

    useEffect(() => {
        const handleResize = () => {
            if (!swiperRef.current) {
                return
            }
            swiperRef.current.update()
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleClick = (e: MouseEvent<HTMLAnchorElement>, anchor: string) => {
        api.setActive(anchor)
    }

    const updateShadowState = useCallback((swiper: SwiperClass) => {
        setShadowState({
            end: !swiper.isEnd,
            start: !swiper.isBeginning,
        })
    }, [])

    return (
        <>
            <div className={styles.intersectionSensor} ref={intersectionSensorRef} />

            <PageSection
                className={cn({ [styles.bar_float]: isFloat, [styles.bar_aligned]: isSticky })}
            >
                <div className={styles.wrapper} id={PAGE_SECTIONS_ANCHORS_ELEMENT_ID}>
                    <Swiper
                        direction={'horizontal'}
                        slidesPerView={'auto'}
                        freeMode={true}
                        modules={[FreeMode]}
                        allowTouchMove={true}
                        grabCursor={true}
                        updateOnWindowResize={true}
                        onSwiper={(s) => {
                            swiperRef.current = s
                        }}
                        onUpdate={updateShadowState}
                        onFromEdge={updateShadowState}
                        onToEdge={updateShadowState}
                    >
                        <SwiperSlide
                            className={cn(
                                styles.content,
                                styles[`contentLayout_${anchors.length <= 6 ? 'grid' : 'scroll'}`],
                            )}
                            style={{
                                gridTemplateColumns: `repeat(${anchors.length}, 1fr)`,
                            }}
                        >
                            {anchors.map((anchor) => (
                                <a
                                    key={anchor.link}
                                    href={`#${anchor.link}`}
                                    className={cn(styles.anchor, {
                                        [styles.anchor_active]: activeLink === anchor.link,
                                    })}
                                    onClick={(e) => handleClick(e, anchor.link)}
                                >
                                    <Text type="pM" className={styles.text}>
                                        {anchor.name}
                                    </Text>
                                </a>
                            ))}
                        </SwiperSlide>
                    </Swiper>

                    {shadowState.start && (
                        <div className={cn(styles.shadow, styles.shadow_start)} />
                    )}

                    {shadowState.end && <div className={cn(styles.shadow, styles.shadow_end)} />}
                </div>
            </PageSection>
        </>
    )
}
