import React, { useEffect, useRef } from 'react'

import { TArticleSection } from '@/components/AnalyticalArticlePage/types'
import { MarkdownContent } from '@/components/ui/MarkdownContent'
import { Heading } from '@/components/ui/typography/Heading'
import { useAnchors } from '@/utils/anchors'

import styles from './index.module.scss'

type TProps = {
    item: TArticleSection
    sectionId: string
}

export const Section: React.FC<TProps> = ({ item, sectionId }) => {
    const ref = useRef<HTMLDivElement>(null)
    const { api: anchorsApi } = useAnchors()

    useEffect(() => {
        if (anchorsApi) {
            const unregister = anchorsApi.watchSectionInViewport(sectionId, ref)
            return () => unregister()
        }
    }, [sectionId, anchorsApi])

    return (
        <div id={sectionId} className={styles.content} ref={ref}>
            <Heading className={styles.title} level={2}>
                {item.title}
            </Heading>
            <MarkdownContent>{item.value}</MarkdownContent>
        </div>
    )
}
