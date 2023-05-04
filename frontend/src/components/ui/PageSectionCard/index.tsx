import cn from 'classnames'
import React from 'react'

import { PageSection } from '@/components/ui/PageSection'
import { TypographyTheme } from '@/components/ui/typography/TypographyTheme'

import styles from './index.module.scss'

type TCardMode = 'light' | 'dark'

type TProps = {
    mode?: TCardMode
    onDark?: boolean
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
            <TypographyTheme theme={mode}>{children}</TypographyTheme>
        </PageSection>
    )
}
