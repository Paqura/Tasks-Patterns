import { Response } from '@admin/general-schemas'
import { GetServerSideProps } from 'next'

import { HomePage } from '@/components/HomePage'
import { adminClient } from '@/utils/adminApi'

export type ServerSideProps = { testValue: string }

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async () => {
    const response = await adminClient.get<Response<'api::config.config'>>(`/api/config`)
    const resp: Response<'api::config.config'> = response.data
    const data = resp.data?.attributes
    return {
        props: {
            testValue: data?.title || '',
        },
    }
}

type Props = ServerSideProps

export default function Home(props: Props) {
    return <HomePage title={props.testValue} />
}
