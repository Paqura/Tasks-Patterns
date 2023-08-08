import React from 'react'

import { TFileData } from '@/components/AnalyticalArticlePage/types'
import { ArticleLayoutGrid, ArticleLayoutGridRightColumn } from '@/components/ArticleLayout'
import { Attachment } from '@/components/Attachment'
import { CardsSlider } from '@/components/ui/CardsSlider'
import { Heading } from '@/components/ui/typography/Heading'
import { useTranslate } from '@/utils/translate'

import styles from './index.module.scss'

export default function HelpfulFiles(props: { files: TFileData[]; title: string }) {
    const translate = useTranslate()
    return (
        <ArticleLayoutGrid className={styles.helpfulFiles}>
            <ArticleLayoutGridRightColumn>
                <Heading level={2}>{translate('helpfulFiles:heading')}</Heading>
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
