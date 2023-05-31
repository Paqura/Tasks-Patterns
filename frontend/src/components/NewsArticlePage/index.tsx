import { TNewsArticleData } from '@/utils/serverDataMappers/news-article'

import styles from './index.module.scss'

import { THeaderData } from 'src/components/Header'
import HelpfulFiles from 'src/components/HelpfulFiles'
import NewsArticle from 'src/components/NewsArticle'
import NewsArticleDate from 'src/components/NewsArticleDate'
import NewsArticleHeader from 'src/components/NewsArticleHeader'
import { PageLayout, TSeo } from 'src/components/PageLayout'
import { PageSectionCard } from 'src/components/ui/PageSectionCard'

export type TNewsArticlePageData = {
    seo: TSeo
    headerData: THeaderData
    newsArticleData: TNewsArticleData
}
type TNewsArticlePageProps = TNewsArticlePageData
export default function NewsArticlePage(props: TNewsArticlePageProps) {
    return (
        <PageLayout seo={props.seo} navItems={props.headerData.navItems}>
            <NewsArticleHeader
                image={props?.newsArticleData?.image ?? { src: '' }}
                title={props.newsArticleData.title}
                topic={props.newsArticleData.topic}
            />
            <PageSectionCard>
                <div className={styles.contentWrapper}>
                    <div className={styles.dateWrap}>
                        <NewsArticleDate date={props.newsArticleData.date} />
                    </div>
                    <div className={styles.content}>
                        <NewsArticle newsArticleData={props.newsArticleData} />
                    </div>
                </div>
                <div className={styles.helpfulFilesWrap}>
                    <div className={styles.helpfulFiles}>
                        <HelpfulFiles
                            files={props.newsArticleData.files}
                            title={props.newsArticleData.filesTitle}
                        />
                    </div>
                </div>
            </PageSectionCard>
        </PageLayout>
    )
}
