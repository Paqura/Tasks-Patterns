import React from 'react'

import { TFileData } from '@/components/AnalyticalArticlePage/types'
import { ArticleLayoutGrid, ArticleLayoutGridRightColumn } from '@/components/ArticleLayout'
import { Attachment } from '@/components/Attachment'
import { CardsSlider } from '@/components/ui/CardsSlider'
import { Heading } from '@/components/ui/typography/Heading'

import styles from './index.module.scss'

export default function HelpfulFiles(props: { files: TFileData[]; title: string }) {
    return (
        <ArticleLayoutGrid className={styles.helpfulFiles}>
            <ArticleLayoutGridRightColumn>
                <Heading level={2}>Helpful files</Heading>
                <Heading className={styles.description} level={3}>
                    {props.title}
                </Heading>
                <CardsSlider hideControls scrollAreaClassName={styles.attachmentsWrap}>
                    {props.files.map((attach, ind: number) => {
                        return <Attachment key={ind} src={attach.url} title={attach.title} />
                    })}
                </CardsSlider>
            </ArticleLayoutGridRightColumn>
        </ArticleLayoutGrid>
    )
}
