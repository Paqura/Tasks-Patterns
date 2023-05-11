import cn from 'classnames'
import React from 'react'

import { PageSection } from '@/components/ui/PageSection'
import { TypographyTheme } from '@/components/ui/typography/TypographyTheme'

import styles from './index.module.scss'

type TCardMode = 'light' | 'dark'

type TProps = {
    mode?: TCardMode
    sectionId?: string
    className?: string
}

export const PageSectionCard: React.FC<React.PropsWithChildren<TProps>> = ({
    children,
    mode = 'light',
    sectionId,
    className,
}) => {
    return (
        <PageSection
            sectionId={sectionId}
            className={cn(styles.sectionCard, styles[`sectionCard_mode_${mode}`], className)}
        >
            <TypographyTheme theme={mode}>{children}</TypographyTheme>
        </PageSection>
    )
}
