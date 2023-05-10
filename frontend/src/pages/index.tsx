import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { HomePage } from '@/components/HomePage'
import { TProductsBlockData } from '@/components/HomePage/components/Products'
import { fetchClients, fetchConfig, fetchProducts } from '@/utils/adminApi'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

export type TServerSideProps = {
    config?: GetAttributesValues<'api::config.config'>
    products?: GetAttributesValues<'api::product.product'>[]
    clients?: GetAttributesValues<'api::client.client'>[]
}

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async () => {
    const config = await fetchConfig()
    const products = await fetchProducts()
    const clients = await fetchClients()

    return {
        props: {
            config,
            products,
            clients,
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

    const clients: TProductsBlockData['clients'] =
        props.clients?.map((product) => ({
            name: product.name || '',
            logo: mapImageMediaFile(product.logo),
        })) || []

    return <HomePage seo={props.config?.seo || {}} products={products} clients={clients} />
}
