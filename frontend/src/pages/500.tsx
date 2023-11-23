import { Error500Screen } from '@/screens/error500'

export default function Page500() {
    return <Error500Screen errorData={{ title: '500', description: 'Internal server error</p>' }} />
}
