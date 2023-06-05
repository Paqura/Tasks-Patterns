import { ErrorPage } from '@/components/ErrorPage'

export default function Page500() {
    return <ErrorPage errorData={{ title: '500', description: 'Internal server error</p>' }} />
}
