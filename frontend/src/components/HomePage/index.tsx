import { AnchorBar } from '@/components/AnchorBar'
import { PageLayout, TSeo } from '@/components/PageLayout'

import { Advantages } from './components/Advantages'
import { Analytics, TAnalyticsBlockData } from './components/Analytics'
import { Products, TProductsBlockData } from './components/Products'
import { Tools } from './components/Tools'

export type THomePageData = {
    seo: TSeo
} & TProductsBlockData &
    TAnalyticsBlockData

export type THomePageProps = THomePageData

const anchors = [
    {
        name: 'Why us?',
        link: '#advantages',
    },
    {
        name: 'What we do?',
        link: '#tools',
    },
    {
        name: 'Our Products',
        link: '#products',
    },
    {
        name: 'Analytics',
        link: '#analytics',
    },
    {
        name: 'Events & News',
        link: '#news',
    },
    {
        name: 'Contact',
        link: '#contact',
    },
]

export const HomePage: React.FC<THomePageProps> = (props) => {
    return (
        <PageLayout seo={props.seo}>
            <h1>The Main page</h1>
            <AnchorBar anchors={anchors} />
            <Advantages />
            <Tools />
            <Products products={props.products} clients={props.clients} />
            <Analytics articles={props.articles} />
        </PageLayout>
    )
}
