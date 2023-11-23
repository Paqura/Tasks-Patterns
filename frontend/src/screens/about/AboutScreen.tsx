import { HeadingSection, THeadingSectionData } from '@/shared/ui/project/HeadingSection'
import { PageLayout, TSeo } from '@/shared/ui/project/PageLayout'
import { AnyQuestions, TAnyQuestionsData } from '@/widgets/AnyQuestions'
import { TFooterData } from '@/widgets/Footer'
import { THeaderData } from '@/widgets/Header'

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
