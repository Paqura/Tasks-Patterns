import { AnyQuestions, TAnyQuestionsData } from '@/components/AnyQuestions'
import { TFooterData } from '@/components/Footer'
import { THeaderData } from '@/components/Header'
import { HeadingSection, THeadingSectionData } from '@/components/HeadingSection'
import { PageLayout, TSeo } from '@/components/PageLayout'

import { ExpertsSection, TExpertsSectionData } from './ui/ExpertsSection'
import { HistorySection, THistorySectionData } from './ui/HistorySection'

export type TAboutScreenData = {
    seo: TSeo
    headerData: THeaderData
    footerData: TFooterData
    anyQuestions: TAnyQuestionsData
    headingSectionData: THeadingSectionData
    expertsSectionData: TExpertsSectionData
    historySectionData: THistorySectionData
}

type TAboutScreenProps = TAboutScreenData

export const AboutScreen = (props: TAboutScreenProps) => {
    return (
        <PageLayout seo={props.seo} headerData={props.headerData} footerData={props.footerData}>
            <HeadingSection data={props.headingSectionData} />
            <ExpertsSection data={props.expertsSectionData} />
            <HistorySection data={props.historySectionData} />
            <AnyQuestions anyQuestionData={props.anyQuestions} />
        </PageLayout>
    )
}
