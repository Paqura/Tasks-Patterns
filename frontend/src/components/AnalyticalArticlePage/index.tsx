import React from 'react'

import { Aside, TTitleTableOfContent } from '@/components/AnalyticalArticlePage/components/Aside'
import { AnchorBar } from '@/components/AnchorBar'
import { AnyQuestions, TAnyQuestionsData } from '@/components/AnyQuestions'
import { TFooterData } from '@/components/Footer'
import HeaderArticle from '@/components/HeaderArticle'
import { PageLayout, TSeo } from '@/components/PageLayout'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Text } from '@/components/ui/typography/Text'
import { PageAnchorsContextProvider } from '@/utils/anchors'
import { CONTACTS_SECTION_ID } from '@/utils/constants'
import { formatDate } from '@/utils/date'
import { useIsDesktopSmall } from '@/utils/hooks'

import { Section } from './components/Section'
import styles from './index.module.scss'
import { TAnalitycArticleData } from './types'

import { THeaderData } from 'src/components/Header/index'
import HelpfulFiles from 'src/components/HelpfulFiles'

export type TAnalitycArticlePageData = {
    seo: TSeo
    headerData: THeaderData
    footerData: TFooterData
    analyticArticleData: TAnalitycArticleData
    anyQuestionsData: TAnyQuestionsData
}
type TAnalitycArticlePageProps = TAnalitycArticlePageData

export const AnalyticalArticlePage: React.FC<TAnalitycArticlePageProps> = (props) => {
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
        <PageLayout seo={props.seo} headerData={props.headerData} footerData={props.footerData}>
            <PageAnchorsContextProvider>
                <div className={styles.wrapper}>
                    <HeaderArticle
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
                                    <Section key={item.number} item={item} />
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
                <AnyQuestions
                    sectionId={CONTACTS_SECTION_ID}
                    anyQuestionData={props.anyQuestionsData}
                />
            </PageAnchorsContextProvider>
        </PageLayout>
    )
}
