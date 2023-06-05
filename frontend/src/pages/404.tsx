import { useRouter } from 'next/router'

export default function Page404() {
    const router = useRouter()

    if (typeof window !== 'undefined') {
        router.push('/not-found')
    }
    return null
}