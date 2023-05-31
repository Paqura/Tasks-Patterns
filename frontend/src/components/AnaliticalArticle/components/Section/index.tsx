import React, { useEffect, useRef } from 'react'

import { TArticleSection } from '@/components/AnaliticalArticle/types'
import { MarkdownContent } from '@/components/ui/MarkdownContent'
import { Heading } from '@/components/ui/typography/Heading'
import { useAnchors } from '@/utils/anchors'

import styles from './index.module.scss'

type TProps = {
    item: TArticleSection
}

export const Section: React.FC<TProps> = ({ item }) => {
    const ref = useRef<HTMLDivElement>(null)
    const { api: anchorsApi } = useAnchors()

    const sectionId = item.number.toString()

    useEffect(() => {
        if (anchorsApi) {
            const unregister = anchorsApi.watchSectionInViewport(sectionId, ref, 0.75)
            return () => unregister()
        }
    }, [sectionId, anchorsApi])

    return (
        <div key={item.number} id={sectionId} className={styles.content} ref={ref}>
            <div className={styles.title}>
                <Heading level={2}>{item.title}</Heading>
            </div>
            <MarkdownContent>{item.value}</MarkdownContent>
        </div>
    )
}
