import cn from 'classnames'
import { PropsWithChildren, ReactNode, useRef } from 'react'

import { SliderButtons, getDisableStatus } from '@/shared/ui/common/SliderButtons'

import styles from './index.module.scss'
import { useCardsSlider } from './lib/useCardsSlider'

type TCardsSliderProps = {
    classes?: TClasses<'root' | 'scrollArea'>
    controls?: ReactNode
    hideControls?: boolean
}

export const CardsSlider = ({
    classes,
    children,
    controls,
    hideControls,
}: PropsWithChildren<TCardsSliderProps>) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const { showScrollControls, canScrollLeft, canScrollRight, handleButtonClick } =
        useCardsSlider(containerRef)

    return (
        <div className={cn(styles.root, classes?.root)}>
            {!hideControls && (
                <div className={styles.controlsBlock}>
                    {controls && <div className={styles.extraControls}>{controls}</div>}

                    {showScrollControls && (
                        <SliderButtons
                            classes={{
                                root: styles.moveButtons,
                            }}
                            disable={getDisableStatus({
                                next: !canScrollRight,
                                prev: !canScrollLeft,
                            })}
                            onClick={handleButtonClick}
                        />
                    )}
                </div>
            )}

            <div className={cn(styles.scrollArea, classes?.scrollArea)} ref={containerRef}>
                {children}
            </div>
        </div>
    )
}
