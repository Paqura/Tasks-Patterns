import React from 'react'

import { Aside, TTitleTableOfContent } from '@/components/AnalyticalArticlePage/components/Aside'
import { AnchorBar } from '@/components/AnchorBar'
import { AnyQuestions, TAnyQuestionsData } from '@/components/AnyQuestions'
import { ArticleDate } from '@/components/ArticleDate'
import { ArticleHeader } from '@/components/ArticleHeader'
import {
    ArticleLayoutGrid,
    ArticleLayoutGridLeftColumn,
    ArticleLayoutGridRightColumn,
} from '@/components/ArticleLayout'
import { TFooterData } from '@/components/Footer'
import { THeaderData } from '@/components/Header/index'
import HelpfulFiles from '@/components/HelpfulFiles'
import { PageLayout, TSeo } from '@/components/PageLayout'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Text } from '@/components/ui/typography/Text'
import { PageAnchorsContextProvider } from '@/utils/anchors'
import { useIsDesktopSmall } from '@/utils/hooks'

import { Section } from './components/Section'
import styles from './index.module.scss'
import { TAnalitycArticleData } from './types'

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

    const sections = props.analyticArticleData.articleText

    const getSectionId = (index: number) => String(index + 1)

    const tableOfContent = sections.map((item, index): TTitleTableOfContent => {
        return {
            name: item.title.replaceAll(regExp, '').trim(),
            link: getSectionId(index),
        }
    })

    return (
        <PageLayout seo={props.seo} headerData={props.headerData} footerData={props.footerData}>
            <PageAnchorsContextProvider>
                <div className={styles.wrapper}>
                    <ArticleHeader
                        title={props.analyticArticleData.title}
                        topic={props.analyticArticleData.topic}
                    />

                    {isDesktopSmall && <AnchorBar anchors={tableOfContent} />}
                    <PageSectionCard className={styles.section}>
                        <ArticleLayoutGrid>
                            <ArticleLayoutGridLeftColumn className={styles.dateWrap}>
                                <ArticleDate date={props.analyticArticleData.published} />
                                {!isDesktopSmall && (
                                    <div className={styles.asideContainer}>
                                        <div className={styles.aside}>
                                            <Text className={styles.asideTitle} type="postscript">
                                                {props.analyticArticleData.titleTableOfContent}
                                            </Text>
                                            <Aside articleHeaders={tableOfContent} />
                                        </div>
                                    </div>
                                )}
                            </ArticleLayoutGridLeftColumn>
                            <ArticleLayoutGridRightColumn>
                                {sections.map((item, index) => (
                                    <Section
                                        key={index}
                                        item={item}
                                        sectionId={getSectionId(index)}
                                    />
                                ))}
                            </ArticleLayoutGridRightColumn>
                        </ArticleLayoutGrid>

                        {props.analyticArticleData.files.length > 0 && (
                            <HelpfulFiles
                                files={props.analyticArticleData.files}
                                title={props.analyticArticleData.titleOfHelpfulFiles}
                            />
                        )}
                    </PageSectionCard>
                </div>
                <AnyQuestions anyQuestionData={props.anyQuestionsData} />
            </PageAnchorsContextProvider>
        </PageLayout>
    )
}
