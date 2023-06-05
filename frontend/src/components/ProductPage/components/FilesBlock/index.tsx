import React from 'react'

import { Attachment } from '@/components/Attachment'
import { CardsSlider } from '@/components/ui/CardsSlider'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import {
    PageSectionCardGrid,
    PageSectionCardGridRightColumn,
} from '@/components/ui/PageSectionCardGrid'
import { PageSectionCardHeader } from '@/components/ui/PageSectionCardHeader'
import { TFile } from '@/types'

import styles from './index.module.scss'

type TProps = {
    data: TFilesBlockData
    sectionId: string
    number: number
}

export type TFilesBlockData = {
    title: string
    description: string
    files: TFile[]
}

export const FilesBlock: React.FC<TProps> = ({ data, sectionId, number }) => {
    return (
        <PageSectionCard mode={'light'} sectionId={sectionId} className={styles.block}>
            <PageSectionCardHeader
                title={data.title}
                description={data.description}
                number={number}
            />
            <PageSectionCardGrid>
                <PageSectionCardGridRightColumn className={styles.listColumn}>
                    <CardsSlider hideControls scrollAreaClassName={styles.listScrollArea}>
                        <ul className={styles.list}>
                            {data.files.map((file, index) => (
                                <li key={index} className={styles.listItem}>
                                    <Attachment title={file.title} src={file.url} />
                                </li>
                            ))}
                        </ul>
                    </CardsSlider>
                </PageSectionCardGridRightColumn>
            </PageSectionCardGrid>
        </PageSectionCard>
    )
}
