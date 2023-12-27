import { Article } from '@/shared/ui/project/Article'
import { HelpfulFiles } from '@/shared/ui/project/HelpfulFiles'
import { MarkdownContent } from '@/shared/ui/project/MarkdownContent'
import { PageLayout, TSeo } from '@/shared/ui/project/PageLayout'
import { PageSection } from '@/shared/ui/project/PageSection'
import { AnyQuestions, TAnyQuestionsData } from '@/widgets/AnyQuestions'
import { TFooterData } from '@/widgets/Footer'
import { THeaderData } from '@/widgets/Header'

import styles from './index.module.scss'
import { TNewsArticleData } from './mappers'

export type TNewsArticleScreenData = {
    seo: TSeo
    headerData: THeaderData
    footerData: TFooterData
    newsArticleData: TNewsArticleData
    anyQuestionsData: TAnyQuestionsData
}

export type TNewsArticleScreenProps = TNewsArticleScreenData

export const NewsArticleScreen = (props: TNewsArticleScreenProps) => {
    return (
        <PageLayout seo={props.seo} headerData={props.headerData} footerData={props.footerData}>
            <Article.Header
                image={props?.newsArticleData?.image}
                title={props.newsArticleData.title}
                topic={props.newsArticleData.topic}
            />

            <PageSection.Card hasAnimation={false}>
                <Article.Layout>
                    <Article.LayoutLeftColumn className={styles.dateWrap}>
                        <Article.Date date={props.newsArticleData.date} />
                    </Article.LayoutLeftColumn>

                    <Article.LayoutRightColumn>
                        <MarkdownContent>{props.newsArticleData.content}</MarkdownContent>
                    </Article.LayoutRightColumn>
                </Article.Layout>

                {props.newsArticleData.files.length > 0 && (
                    <HelpfulFiles
                        files={props.newsArticleData.files}
                        title={props.newsArticleData.filesTitle}
                    />
                )}
            </PageSection.Card>

            <AnyQuestions anyQuestionData={props.anyQuestionsData} hasAnimation={false} />
        </PageLayout>
    )
}
