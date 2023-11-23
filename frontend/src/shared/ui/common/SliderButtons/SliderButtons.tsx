import cn from 'classnames'
import Image from 'next/image'
import React from 'react'

import { useTypographyTheme } from '@/shared/ui/common/typography/TypographyTheme'

import styles from './index.module.scss'

import arrowLeftIcon from 'public/images/common/arrow-left.svg'
import arrowRightIcon from 'public/images/common/arrow-right.svg'

type TSliderButtonsProps = {
    className?: string
    disableLeft?: boolean
    disableRight?: boolean
    onLeftClick?: React.MouseEventHandler
    onRightClick?: React.MouseEventHandler
}

export const SliderButtons = ({
    className,
    disableLeft,
    disableRight,
    onLeftClick,
    onRightClick,
}: TSliderButtonsProps) => {
    const theme = useTypographyTheme()

    return (
        <div
            className={cn(
                styles.buttons,
                {
                    [styles[`theme_${theme}`]]: !!theme,
                    [styles.disabled]: disableLeft && disableRight,
                },
                className,
            )}
        >
            <button className={styles.button} onClick={onLeftClick} disabled={disableLeft}>
                <Image src={arrowLeftIcon} alt="arrow left" />
            </button>

            <span className={styles.divider} />
            <button className={styles.button} onClick={onRightClick} disabled={disableRight}>
                <Image src={arrowRightIcon} alt="arrow right" />
            </button>
        </div>
    )
}
