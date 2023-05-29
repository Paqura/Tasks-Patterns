import cn from 'classnames'
import React, { useEffect, useRef } from 'react'

import { PageSection } from '@/components/ui/PageSection'
import { TypographyTheme } from '@/components/ui/typography/TypographyTheme'
import { useAnchors } from '@/utils/anchors'

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
    const ref = useRef<HTMLDivElement>(null)
    const { api: anchorsApi } = useAnchors()

    useEffect(() => {
        if (anchorsApi && sectionId) {
            const unregister = anchorsApi.watchSectionInViewport(sectionId, ref)
            return () => unregister()
        }
    }, [sectionId, anchorsApi])

    return (
        <PageSection
            sectionId={sectionId}
            className={cn(styles.sectionCard, styles[`sectionCard_mode_${mode}`], className)}
            ref={ref}
        >
            <TypographyTheme theme={mode}>{children}</TypographyTheme>
        </PageSection>
    )
}
