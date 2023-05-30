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

type TAboutPageProps = TAboutPageData

export const AboutPage: React.FC<TAboutPageProps> = (props) => {
    return (
        <PageLayout seo={props.seo} navItems={props.headerData.navItems}>
            <HeadingSection data={props.headingSectionData} />
            <ExpertsSection data={props.expertsSectionData} />
            <HistorySection data={props.historySectionData} />
        </PageLayout>
    )
}
