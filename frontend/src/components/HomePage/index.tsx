import { PageLayout, TSeo } from '@/components/PageLayout'

import { Advantages } from './components/Advantages'

export type THomePageProps = {
    seo: TSeo
}

export const HomePage: React.FC<THomePageProps> = (props) => {
    return (
        <PageLayout seo={props.seo}>
            <h1>The Main page</h1>
            <Advantages />
        </PageLayout>
    )
}
