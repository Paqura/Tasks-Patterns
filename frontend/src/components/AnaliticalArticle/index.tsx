import DOMPurify from 'isomorphic-dompurify'
import { marked } from 'marked'
import React from 'react'

import Aside, { TTitleTableOfContent } from '@/components/AnaliticalArticle/components/Aside'
import { AnchorBar } from '@/components/AnchorBar'
import { PageLayout, TSeo } from '@/components/PageLayout'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Text } from '@/components/ui/typography/Text'
import { formatDate } from '@/utils/date'
import { useIsDesktopSmall } from '@/utils/hooks'

import HelpfulFiles from './components/HelpfulFiles'
import styles from './index.module.scss'
import { TAnalitycArticleData } from './types'

import Header from 'src/components/AnaliticalArticle/components/Header'
import { THeaderData } from 'src/components/Header/index'

export type TAnalitycArticlePageData = {
    seo: TSeo
    headerData: THeaderData
    analyticArticleData: TAnalitycArticleData
}
type TAnalitycArticlePageProps = TAnalitycArticlePageData

export default function AnalyticalArticle(props: TAnalitycArticlePageProps) {
    const isDesktopSmall = useIsDesktopSmall()
    const regExp = new RegExp(/#+|=|<h[0-9]>|<\/h[0-9]>/g)

    const sortSection = props.analyticArticleData.articleText.sort((a, b) => a.number - b.number)

    const tableOfContent = sortSection.map((item): TTitleTableOfContent => {
        return {
            name: item.title.replaceAll(regExp, '').trim(),
            link: item.number.toString(),
        }
    })

    return (
        <PageLayout seo={props.seo} navItems={props.headerData.navItems}>
            <div className={styles.wrapper}>
                <Header
                    title={props.analyticArticleData.title}
                    topic={props.analyticArticleData.topic}
                />

                {isDesktopSmall && <AnchorBar anchors={tableOfContent} />}
                <PageSectionCard className={styles.section}>
                    <div className={styles.wrapperSection}>
                        <Text className={styles.date} type="pM">
                            {formatDate(props.analyticArticleData.published)}
                        </Text>

                        {!isDesktopSmall && (
                            <div className={styles.aside}>
                                <Text className={styles.title} type="postscript">
                                    {props.analyticArticleData.titleTableOfContent}
                                </Text>
                                <Aside articleHeaders={tableOfContent} />
                            </div>
                        )}
                        <div className={styles.contentWrapper}>
                            {sortSection.map((item) => (
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
                    </div>
                    <div className={styles.helpfulFilesWrap}>
                        <div className={styles.helpfulFiles}>
                            <HelpfulFiles
                                files={props.analyticArticleData.files}
                                title={props.analyticArticleData.titleOfHelpfulFiles}
                            />
                        </div>
                    </div>
                </PageSectionCard>
            </div>
        </PageLayout>
    )
}
