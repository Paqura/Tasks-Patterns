import cn from 'classnames'
import React from 'react'

import { PageSection } from '@/components/ui/PageSection'
import { TTypographyTheme } from '@/components/ui/typography/types'
import { TypographyTheme } from '@/components/ui/typography/TypographyTheme'

import styles from './index.module.scss'

type TCardMode = 'light' | 'dark'

type TProps = {
    mode?: TCardMode
    onDark?: boolean
}

const typographyThemes: { [key in TCardMode]: TTypographyTheme } = {
    light: {
        headingClasses: {
            1: styles[`sectionCard_mode_light__heading-1-theme`],
            2: styles[`sectionCard_mode_light__heading-2-theme`],
            3: styles[`sectionCard_mode_light__heading-3-theme`],
        },
        textClasses: {
            pL: styles[`sectionCard_mode_light__text-pL-theme`],
            pM: styles[`sectionCard_mode_light__text-pM-theme`],
            pS: styles[`sectionCard_mode_light__text-pS-theme`],
            pHeadline: styles[`sectionCard_mode_light__text-pHeadline-theme`],
            postscript: styles[`sectionCard_mode_light__text-postscript-theme`],
            quote: styles[`sectionCard_mode_light__text-quote-theme`],
        },
    },
    dark: {
        headingClasses: {
            1: styles[`sectionCard_mode_dark__heading-1-theme`],
            2: styles[`sectionCard_mode_dark__heading-2-theme`],
            3: styles[`sectionCard_mode_dark__heading-3-theme`],
        },
        textClasses: {
            pL: styles[`sectionCard_mode_dark__text-pL-theme`],
            pM: styles[`sectionCard_mode_dark__text-pM-theme`],
            pS: styles[`sectionCard_mode_dark__text-pS-theme`],
            pHeadline: styles[`sectionCard_mode_dark__text-pHeadline-theme`],
            postscript: styles[`sectionCard_mode_dark__text-postscript-theme`],
            quote: styles[`sectionCard_mode_dark__text-quote-theme`],
        },
    },
}
export const PageSectionCard: React.FC<React.PropsWithChildren<TProps>> = ({
    children,
    mode = 'light',
    onDark,
}) => {
    return (
        <PageSection
            className={cn(styles.sectionCard, styles[`sectionCard_mode_${mode}`], {
                [styles[`sectionCard_on-dark`]]: onDark,
            })}
        >
            <TypographyTheme mode={mode} theme={typographyThemes[mode]}>
                {children}
            </TypographyTheme>
        </PageSection>
    )
}
