import { AnyQuestions, TAnyQuestionsData } from '@/components/AnyQuestions'
import { THeaderData } from '@/components/Header'
import { HeadingSection, THeadingSectionData } from '@/components/HeadingSection'
import { PageLayout, TSeo } from '@/components/PageLayout'

import { ExpertsSection, TExpertsSectionData } from './components/ExpertsSection'
import { HistorySection, THistorySectionData } from './components/HistorySection'

export type TAboutPageData = {
    seo: TSeo
    headerData: THeaderData
    headingSectionData: THeadingSectionData
    expertsSectionData: TExpertsSectionData
    historySectionData: THistorySectionData
}

type TAboutPageProps = {
    anyQuestions: TAnyQuestionsData
} & TAboutPageData

export const AboutPage: React.FC<TAboutPageProps> = (props) => {
    return (
        <PageLayout seo={props.seo} headerData={props.headerData}>
            <HeadingSection data={props.headingSectionData} />
            <ExpertsSection data={props.expertsSectionData} />
            <HistorySection data={props.historySectionData} />
            <AnyQuestions anyQuestionData={props.anyQuestions} />
        </PageLayout>
    )
}
