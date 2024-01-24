import cn from 'classnames'
import Image from 'next/image'
import React, { MouseEvent } from 'react'

import { useTypographyTheme } from '@/shared/ui/common/typography/TypographyTheme'

import styles from './index.module.scss'
import type { TDisableStatus } from './lib/disableStatus'

import arrowLeftIcon from 'public/images/common/arrow-left.svg'
import arrowRightIcon from 'public/images/common/arrow-right.svg'

export type TClickDirection = 'prev' | 'next'

type TSliderButtonsProps = {
    classes?: TClasses<'root' | 'buttonPrev' | 'buttonNext'>
    disable?: TDisableStatus

    onClick: (dir: TClickDirection, evt: MouseEvent<HTMLButtonElement>) => void
}

export const SliderButtons = ({ classes, disable, onClick }: TSliderButtonsProps) => {
    const theme = useTypographyTheme()

    return (
        <div
            className={cn(
                styles.root,
                {
                    [styles[`theme_${theme}`]]: Boolean(theme),
                    [styles.disabled]: disable === 'both',
                },
                classes?.root,
            )}
        >
            <button
                className={cn(styles.button, classes?.buttonPrev)}
                onClick={(evt) => onClick('prev', evt)}
                disabled={disable === 'prev'}
            >
                <Image src={arrowLeftIcon} alt="arrow left" />
            </button>

            <span className={styles.divider} />

            <button
                className={cn(styles.button, classes?.buttonNext)}
                onClick={(evt) => onClick('next', evt)}
                disabled={disable === 'next'}
            >
                <Image src={arrowRightIcon} alt="arrow right" />
            </button>
        </div>
    )
}
