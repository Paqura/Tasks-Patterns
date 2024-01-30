import '@af-utils/scrollend-polyfill'
import cn from 'classnames'
import { useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/free-mode'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

import { PAGE_SECTIONS_ANCHORS_ELEMENT_ID } from '@/shared/lib/constants'
import { useObserver } from '@/shared/lib/hooks'
import { Text } from '@/shared/ui/common/typography/Text'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'
import { useResize } from './lib/resize'
import { useScrollIntoView } from './lib/scrollIntoView'
import { useShadowState } from './lib/shadowState'

export type TAnchorLink = {
    name: string
    link: string
}

export type TAnchorBarProps = {
    anchors: TAnchorLink[]
    isFloat?: boolean
}

export const AnchorBar = ({ anchors, isFloat = true }: TAnchorBarProps) => {
    const [isSticky, setIsSticky] = useState(false)

    const swiperRef = useRef<SwiperClass>()
    const intersectionSensorRef = useRef<HTMLDivElement>(null)

    useObserver(intersectionSensorRef, setIsSticky, isFloat)
    useResize(swiperRef)

    const { handleAnchorClick, activeLink } = useScrollIntoView(swiperRef)
    const { handleShadowStateChange, shadowState } = useShadowState()

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
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper
                        }}
                        onUpdate={handleShadowStateChange}
                        onFromEdge={handleShadowStateChange}
                        onToEdge={handleShadowStateChange}
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
                                    onClick={() => handleAnchorClick(anchor.link)}
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
