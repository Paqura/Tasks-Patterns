import cn from 'classnames'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/free-mode'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

import { useAnchors } from '@/shared/lib/anchors'
import { PAGE_SECTIONS_ANCHORS_ELEMENT_ID } from '@/shared/lib/constants'
import { useIsMobile, useObserver } from '@/shared/lib/hooks'
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

    const isMobile = useIsMobile()

    const BAR_OFFSET = isMobile ? 20 : 40

    const rectMap = useMemo(() => {
        if (typeof document === 'undefined') return {}

        const elements = document.querySelectorAll('[data-anchor-element]')

        const rectMap = Array.from(elements).reduce<Record<string, DOMRect>>((acc, curr) => {
            const key = (curr.getAttribute('href') ?? '').slice(1)

            acc[key] = curr.getBoundingClientRect()

            return acc
        }, {})

        return rectMap
    }, [])

    useEffect(() => {
        const getSwiperApi = () => swiperRef.current

        const handleScrollIntoView = () => {
            const swiperApi = getSwiperApi()

            if (!activeLink || !swiperApi) return

            swiperApi.translateTo(-Math.abs(rectMap[activeLink].x - BAR_OFFSET), 100)
            swiperApi.update()
        }

        window.addEventListener('scrollend', handleScrollIntoView)

        return () => {
            window.removeEventListener('scrollend', handleScrollIntoView)
        }
    }, [BAR_OFFSET, activeLink, api, rectMap])

    const handleClick = (anchor: string) => {
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
                        freeMode
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
                                    data-anchor-element
                                    href={`#${anchor.link}`}
                                    className={cn(styles.anchor, {
                                        [styles.anchor_active]: activeLink === anchor.link,
                                    })}
                                    onClick={() => handleClick(anchor.link)}
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
