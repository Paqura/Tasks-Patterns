import { CardsSlider } from '@/shared/ui/common/CardsSlider'
import { Attachment } from '@/shared/ui/project/Attachment'
import { PageSection } from '@/shared/ui/project/PageSection'
import { TFile } from '@/types'

import styles from './index.module.scss'

export type TFilesBlockData = {
    title: string
    description: string
    files: TFile[]
}

type TFilesBlockProps = {
    data: TFilesBlockData
    sectionId: string
    number: number
}

export const FilesBlock = ({ data, sectionId, number }: TFilesBlockProps) => {
    return (
        <PageSection.Card mode={'light'} sectionId={sectionId} contentClassName={styles.block}>
            <PageSection.Header title={data.title} description={data.description} number={number} />

            <PageSection.Grid>
                <PageSection.RightColumn className={styles.listColumn}>
                    <CardsSlider hideControls classes={{ scrollArea: styles.listScrollArea }}>
                        <ul className={styles.list}>
                            {data.files.map((file, index) => (
                                <li key={index} className={styles.listItem}>
                                    <Attachment title={file.title} src={file.url} />
                                </li>
                            ))}
                        </ul>
                    </CardsSlider>
                </PageSection.RightColumn>
            </PageSection.Grid>
        </PageSection.Card>
    )
}
