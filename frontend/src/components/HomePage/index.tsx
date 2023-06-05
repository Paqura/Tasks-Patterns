import { AnchorBar } from '@/components/AnchorBar'
import { THeaderData } from '@/components/Header'
import { PageLayout, TSeo } from '@/components/PageLayout'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Heading } from '@/components/ui/typography/Heading'
import { PageAnchorsContextProvider } from '@/utils/anchors'
import { CONTACTS_SECTION_ID } from '@/utils/constants'

import { Advantages } from './components/Advantages'
import { Analytics, TAnalyticsBlockData } from './components/Analytics'
import { Banner, TBannerData } from './components/Banner'
import { News, TNewsBlockData } from './components/News'
import { Products, TProductsBlockData } from './components/Products'
import { Tools } from './components/Tools'

export type THomePageData = {
    seo: TSeo
    headingBlock: TBannerData
    productsBlock: TProductsBlockData
    newsBlock: TNewsBlockData
    analyticsBlock: TAnalyticsBlockData
    headerData: THeaderData
}

export type THomePageProps = THomePageData

const anchors = [
    {
        name: 'Why us?',
        link: 'advantages',
    },
    {
        name: 'What we do?',
        link: 'tools',
    },
    {
        name: 'Our Products',
        link: 'products',
    },
    {
        name: 'Analytics',
        link: 'analytics',
    },
    {
        name: 'Events & News',
        link: 'news',
    },
    {
        name: 'Contact',
        link: 'contact',
    },
]

export const HomePage: React.FC<THomePageProps> = (props) => {
    return (
        <PageLayout seo={props.seo} headerData={props.headerData}>
            <PageAnchorsContextProvider>
                <Banner data={props.headingBlock} />
                <AnchorBar anchors={anchors} />
                <Advantages />
                <Tools />
                <Products data={props.productsBlock} />
                <Analytics data={props.analyticsBlock} />
                <News data={props.newsBlock} />
                <PageSectionCard sectionId={CONTACTS_SECTION_ID}>
                    <Heading level={2}>Contacts form</Heading>
                </PageSectionCard>
            </PageAnchorsContextProvider>
        </PageLayout>
    )
}
