import cn from 'classnames'
import { PropsWithChildren, useEffect, useRef } from 'react'

import { useAnchors } from '../../../AnchorBar'
import { TypographyTheme } from '@/shared/ui/common/typography/TypographyTheme'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'

type TCardMode = 'light' | 'dark'

type TCardProps = {
    mode?: TCardMode
    sectionId?: string
    hasAnimation?: boolean
    classes?: TClasses<'root' | 'content'>
}

export const Card = ({
    children,
    mode = 'light',
    sectionId,
    hasAnimation = true,
    classes,
}: PropsWithChildren<TCardProps>) => {
    const { api: anchorsApi } = useAnchors()

    const sectionRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

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
            { rootMargin: '0px 0px 0px 0px' },
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
            className={cn(styles.section, classes?.root)}
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
                    classes?.content,
                )}
            >
                <TypographyTheme theme={mode}>{children}</TypographyTheme>
            </div>
        </PageSection>
    )
}
