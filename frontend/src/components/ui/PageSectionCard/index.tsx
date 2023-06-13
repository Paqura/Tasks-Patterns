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
    hasAnimation?: boolean
    sectionClassName?: string
    contentClassName?: string
}

export const PageSectionCard: React.FC<React.PropsWithChildren<TProps>> = ({
    children,
    mode = 'light',
    sectionId,
    hasAnimation = true,
    sectionClassName,
    contentClassName,
}) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const { api: anchorsApi } = useAnchors()

    useEffect(() => {
        if (!contentRef.current || !hasAnimation) {
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries

                if (entry.isIntersecting) {
                    contentRef.current?.classList.add(styles.animationReveal)
                } else {
                    if (entry.boundingClientRect.y < 0) {
                        // Пользователь листает вниз и элемент исчезает сверху
                        // либо блок вообще сверху

                        contentRef.current?.classList.add(styles.animationReveal)
                    } else {
                        // Пользователь листает наверх и элемент исчезает снизу
                        // либо блок вообще снизу

                        contentRef.current?.classList.remove(styles.animationReveal)
                    }
                }
            },
            { rootMargin: '0px 0px 0px 0px' }
        )

        observer.observe(contentRef.current)

        return () => {
            observer.disconnect()
        }
    }, [hasAnimation])

    useEffect(() => {
        if (anchorsApi && sectionId) {
            const unregister = anchorsApi.watchSectionInViewport(sectionId, sectionRef)
            return () => unregister()
        }
    }, [sectionId, anchorsApi])

    return (
        <PageSection
            sectionId={sectionId}
            className={cn(styles.section, sectionClassName)}
            ref={sectionRef}
        >
            <div
                ref={contentRef}
                className={cn(
                    styles.contentWrapper,
                    styles[`mode_${mode}`],
                    {
                        [styles.animation]: hasAnimation,
                    },
                    contentClassName
                )}
            >
                <TypographyTheme theme={mode}>{children}</TypographyTheme>
            </div>
        </PageSection>
    )
}
