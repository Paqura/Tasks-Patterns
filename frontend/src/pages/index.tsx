import { GetAttributesValues } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { HomePage } from '@/components/HomePage'
import { fetchConfig } from '@/utils/adminApi'

export type TServerSideProps = { config?: GetAttributesValues<'api::config.config'> }

export const getServerSideProps: GetServerSideProps<TServerSideProps> = async () => {
    const data = await fetchConfig()
    return {
        props: {
            config: data,
        },
    }
}

type TProps = TServerSideProps

export default function Home(props: TProps) {
    return <HomePage seo={props.config?.seo || {}} />
}
