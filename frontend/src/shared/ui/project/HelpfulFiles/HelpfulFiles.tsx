import { TFileData } from '@/screens/analyticArticle'
import { useTranslate } from '@/shared/lib/translate'
import { CardsSlider } from '@/shared/ui/common/CardsSlider'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { Article } from '@/shared/ui/project/Article'
import { Attachment } from '@/shared/ui/project/Attachment'

import styles from './index.module.scss'

export type THelpfulFilesProps = {
    files: TFileData[]
    title: string
}

export const HelpfulFiles = ({ title, files }: THelpfulFilesProps) => {
    const translate = useTranslate()
    return (
        <Article.Layout className={styles.helpfulFiles}>
            <Article.LayoutRightColumn>
                <Heading level={2}>{translate('helpfulFiles.heading')}</Heading>

                <Heading className={styles.description} level={3}>
                    {title}
                </Heading>

                <CardsSlider hideControls scrollAreaClassName={styles.attachmentsWrap}>
                    {files.map((attach, idx: number) => {
                        return <Attachment key={idx} src={attach.url} title={attach.title} />
                    })}
                </CardsSlider>
            </Article.LayoutRightColumn>
        </Article.Layout>
    )
}
