import DOMPurify from 'dompurify'
import { marked } from 'marked'

import { Text } from '@/components/ui/typography/Text'
import { formatDate } from '@/utils/date'
import { TNewsArticleData } from '@/utils/serverDataMappers/news-article'

import styles from './index.module.scss'

import HelpfulFiles from 'src/components/AnaliticalArticle/components/HelpfulFiles'
import { THeaderData } from 'src/components/Header'
import HeaderArticle from 'src/components/HeaderArticle'
import { PageLayout, TSeo } from 'src/components/PageLayout'
import { PageSectionCard } from 'src/components/ui/PageSectionCard'

export type TNewsArticlePageData = {
    seo: TSeo
    headerData: THeaderData
    newsArticleData: TNewsArticleData
}
type TNewsArticlePageProps = TNewsArticlePageData
export default function NewsArticle(props: TNewsArticlePageProps) {
    return (
        <PageLayout seo={props.seo} navItems={props.headerData.navItems}>
            <div className={styles.wrapper}>
                <HeaderArticle
                    title={props.newsArticleData.title}
                    topic={props.newsArticleData.topic}
                />

                <PageSectionCard className={styles.section}>
                    <Text className={styles.date} type="pM">
                        {props.newsArticleData.date && formatDate(props.newsArticleData.date)}
                    </Text>

                    <div className={styles.contentWrapper}>
                        {props.newsArticleData.articleText.map((item) => (
                            <div
                                key={item.number}
                                id={item.number.toString()}
                                className={styles.content}
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(marked.parse(item.title)),
                                    }}
                                />
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(marked.parse(item.value)),
                                    }}
                                />
                            </div>
                        ))}
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
            </div>
        </PageLayout>
    )
}
