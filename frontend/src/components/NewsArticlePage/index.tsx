import { AnyQuestions, TAnyQuestionsData } from '@/components/AnyQuestions'
import { ArticleDate } from '@/components/ArticleDate'
import { ArticleHeader } from '@/components/ArticleHeader'
import {
    ArticleLayoutGrid,
    ArticleLayoutGridLeftColumn,
    ArticleLayoutGridRightColumn,
} from '@/components/ArticleLayout'
import { TFooterData } from '@/components/Footer'
import { THeaderData } from '@/components/Header'
import HelpfulFiles from '@/components/HelpfulFiles'
import { PageLayout, TSeo } from '@/components/PageLayout'
import { MarkdownContent } from '@/components/ui/MarkdownContent'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { TNewsArticleData } from '@/utils/serverDataMappers/news-article'

import styles from './index.module.scss'

export type TNewsArticlePageData = {
    seo: TSeo
    headerData: THeaderData
    footerData: TFooterData
    newsArticleData: TNewsArticleData
    anyQuestionsData: TAnyQuestionsData
}
type TNewsArticlePageProps = TNewsArticlePageData
export default function NewsArticlePage(props: TNewsArticlePageProps) {
    return (
        <PageLayout seo={props.seo} headerData={props.headerData} footerData={props.footerData}>
            <ArticleHeader
                image={props?.newsArticleData?.image}
                title={props.newsArticleData.title}
                topic={props.newsArticleData.topic}
            />
            <PageSectionCard hasAnimation={false}>
                <ArticleLayoutGrid>
                    <ArticleLayoutGridLeftColumn className={styles.dateWrap}>
                        <ArticleDate date={props.newsArticleData.date} />
                    </ArticleLayoutGridLeftColumn>
                    <ArticleLayoutGridRightColumn>
                        <MarkdownContent>{props.newsArticleData.content}</MarkdownContent>
                    </ArticleLayoutGridRightColumn>
                </ArticleLayoutGrid>

                {props.newsArticleData.files.length > 0 && (
                    <HelpfulFiles
                        files={props.newsArticleData.files}
                        title={props.newsArticleData.filesTitle}
                    />
                )}
            </PageSectionCard>
            <AnyQuestions anyQuestionData={props.anyQuestionsData} hasAnimation={false} />
        </PageLayout>
    )
}
