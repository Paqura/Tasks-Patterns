import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { HomePage } from '@/components/HomePage'
import { TProductsBlockData } from '@/components/HomePage/components/Products'
import { fetchConfig, fetchProducts } from '@/utils/adminApi'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    products?: GetAttributesValues<'api::product.product'>[]
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async () => {
    const config = await fetchConfig()
    const products = await fetchProducts()
    return {
        props: {
            config,
            products,
        },
    }
}

type TProps = TServerSideProps

export default function Home(props: TProps) {
    const products: TProductsBlockData['products'] =
        props.products?.map((product) => ({
            title: product.title || '',
            description: product.subtitle,
            icon: mapImageMediaFile(product.icon),
            href: product.link || '/',
        })) || []

    return <HomePage seo={props.config?.seo || {}} products={products} />
}
