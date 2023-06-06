import { AnyQuestions, TAnyQuestionsData } from '@/components/AnyQuestions'
import { ArticleDate } from '@/components/ArticleDate'
import {
    ArticleLayoutGrid,
    ArticleLayoutGridLeftColumn,
    ArticleLayoutGridRightColumn,
} from '@/components/ArticleLayout'
import { TFooterData } from '@/components/Footer'
import { MarkdownContent } from '@/components/ui/MarkdownContent'
import { TNewsArticleData } from '@/utils/serverDataMappers/news-article'

import styles from './index.module.scss'

import { THeaderData } from 'src/components/Header'
import HelpfulFiles from 'src/components/HelpfulFiles'
import NewsArticleHeader from 'src/components/NewsArticleHeader'
import { PageLayout, TSeo } from 'src/components/PageLayout'
import { PageSectionCard } from 'src/components/ui/PageSectionCard'

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
            <NewsArticleHeader
                image={props?.newsArticleData?.image}
                title={props.newsArticleData.title}
                topic={props.newsArticleData.topic}
            />
            <PageSectionCard>
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
            <AnyQuestions anyQuestionData={props.anyQuestionsData} />
        </PageLayout>
    )
}
