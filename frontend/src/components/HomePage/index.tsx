import { PageLayout } from '@/components/PageLayout'

export type HomePageProps = {
    title: string
}

export const HomePage: React.FC<HomePageProps> = (props) => {
    return (
        <PageLayout>
            <h1>The Main page</h1>
            <h2>{props.title}</h2>
        </PageLayout>
    )
}
