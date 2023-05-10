import { PageLayout, TSeo } from '@/components/PageLayout'

import { Advantages } from './components/Advantages'
import { Products, TProductsBlockData } from './components/Products'
import { Tools } from './components/Tools'

export type THomePageProps = {
    seo: TSeo
} & TProductsBlockData

export const HomePage: React.FC<THomePageProps> = (props) => {
    return (
        <PageLayout seo={props.seo}>
            <h1>The Main page</h1>
            <Advantages />
            <Tools />
            <Products products={props.products} clients={props.clients} />
        </PageLayout>
    )
}
