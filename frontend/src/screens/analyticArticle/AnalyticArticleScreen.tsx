import { PageAnchorsContextProvider } from '@/shared/lib/anchors'
import { useIsDesktopSmall } from '@/shared/lib/hooks'
import { Text } from '@/shared/ui/common/typography/Text'
import { AnchorBar } from '@/shared/ui/project/AnchorBar'
import { Article } from '@/shared/ui/project/Article'
import { HelpfulFiles } from '@/shared/ui/project/HelpfulFiles'
import { PageLayout, TSeo } from '@/shared/ui/project/PageLayout'
import { PageSection } from '@/shared/ui/project/PageSection'
import { AnyQuestions, TAnyQuestionsData } from '@/widgets/AnyQuestions'
import { TFooterData } from '@/widgets/Footer'
import { THeaderData } from '@/widgets/Header'

import styles from './index.module.scss'
import { TAnalyticArticleData } from './types'
import { Aside, TTitleTableOfContent } from './ui/Aside'
import { Section } from './ui/Section'

export type TAnalyticArticleScreenData = {
    seo: TSeo
    headerData: THeaderData
    footerData: TFooterData
    analyticArticleData: TAnalyticArticleData
    anyQuestionsData: TAnyQuestionsData
}

export type TAnalyticArticleScreenProps = TAnalyticArticleScreenData

export const AnalyticArticleScreen = (props: TAnalyticArticleScreenProps) => {
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
                    <Article.Header
                        title={props.analyticArticleData.title}
                        topic={props.analyticArticleData.topic}
                        image={null}
                    />

                    {isDesktopSmall && <AnchorBar anchors={tableOfContent} />}

                    <PageSection.Card hasAnimation={false}>
                        <Article.Layout>
                            <Article.LayoutLeftColumn className={styles.dateWrap}>
                                <Article.Date date={props.analyticArticleData.published} />
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
                            </Article.LayoutLeftColumn>

                            <Article.LayoutRightColumn>
                                {sections.map((item, index) => (
                                    <Section
                                        key={index}
                                        item={item}
                                        sectionId={getSectionId(index)}
                                    />
                                ))}
                            </Article.LayoutRightColumn>
                        </Article.Layout>

                        {props.analyticArticleData.files.length > 0 && (
                            <HelpfulFiles
                                files={props.analyticArticleData.files}
                                title={props.analyticArticleData.titleOfHelpfulFiles}
                            />
                        )}
                    </PageSection.Card>
                </div>

                <AnyQuestions anyQuestionData={props.anyQuestionsData} hasAnimation={false} />
            </PageAnchorsContextProvider>
        </PageLayout>
    )
}
