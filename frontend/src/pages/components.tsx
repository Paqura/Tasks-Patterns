// Временная страница для тестирования отдельных компонентов

import { PageLayout } from '@/components/PageLayout'
import { Link } from '@/components/ui/Link'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

export default function Components() {
    return (
        <PageLayout seo={{}}>
            <h1>The Components page </h1>
            <PageSectionCard>
                <Heading level={1}>Heading level 1</Heading>
                <Heading level={2}>Heading level 2</Heading>
                <Heading level={3}>Heading level 3</Heading>
            </PageSectionCard>
            <PageSectionCard>
                <Text type="pL">Text type pL</Text>
                <Text type="pM">Text type pM</Text>
                <Text type="pS">Text type pS</Text>
                <Text type="pHeadline">Text type pHeadline</Text>
                <Text type="postscript">Text type postscript</Text>
                <Text type="quote">Text type quote</Text>
            </PageSectionCard>
            <PageSectionCard mode={'dark'}>
                <Heading level={1}>Heading level 1</Heading>
                <Heading level={2}>Heading level 2</Heading>
                <Heading level={3}>Heading level 3</Heading>
            </PageSectionCard>
            <PageSectionCard mode="dark">
                <Text type="pL">Text type pL</Text>
                <Text type="pM">Text type pM</Text>
                <Text type="pS">Text type pS</Text>
                <Text type="pHeadline">Text type pHeadline</Text>
                <Text type="postscript">Text type postscript</Text>
                <Text type="quote">Text type quote</Text>
            </PageSectionCard>
            <PageSectionCard>
                <Link href="#" type="m">
                    Link size M
                </Link>
                <br />
                <Link href="#" type="s">
                    Link size S
                </Link>
            </PageSectionCard>
            <PageSectionCard mode="dark">
                <Link href="#" type="m">
                    Link size M
                </Link>
                <br />
                <Link href="#" type="s">
                    Link size S
                </Link>
            </PageSectionCard>
        </PageLayout>
    )
}
