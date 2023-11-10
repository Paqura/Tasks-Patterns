import { useEffect, useRef } from 'react'

import { TArticleSection } from '@/screens/analyticArticle/types'
import { useAnchors } from '@/shared/lib/anchors'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { MarkdownContent } from '@/shared/ui/project/MarkdownContent'

import styles from './index.module.scss'

type TSectionProps = {
    item: TArticleSection
    sectionId: string
}

export const Section = ({ item, sectionId }: TSectionProps) => {
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
