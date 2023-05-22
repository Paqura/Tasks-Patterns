import { THeaderData } from '@/components/Header'
import { PageLayout, TSeo } from '@/components/PageLayout'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Heading } from '@/components/ui/typography/Heading'
import { TImage } from '@/types'
import { CONTACTS_SECTION_ID } from '@/utils/constants'

import { Banner } from './Banner'

export type TProductsBlockData = { sectionId: string } & {
    type: 'tasks'
    data: TProductTasksBlockData
}

export type TProductTasksBlockData = {
    title: string
    description?: string
    tasks: { title: string; description?: string; image: TImage }[]
    statistics?: {
        title: string
        values: { value: string; label: string }[]
    }
}

export type TProductData = {
    title: string
    subtitle?: string
    logo: TImage
    bannerImage: TImage
    blocks: TProductsBlockData[]
}

export type TProductPageData = {
    seo: TSeo
    header: THeaderData
    product: TProductData
}

export type TProductPageProps = TProductPageData

export const ProductPage: React.FC<TProductPageProps> = ({ product, header, seo }) => {
    const renderBlock = (block: TProductsBlockData) => {
        switch (block.type) {
            case 'tasks':
                return (
                    <PageSectionCard sectionId={block.sectionId} key={block.sectionId}>
                        <Heading level={2}>{block.data.title}</Heading>
                    </PageSectionCard>
                )
                break

            default:
                break
        }
    }
    return (
        <PageLayout seo={seo} navItems={header.navItems}>
            <Banner
                title={product.title}
                subtitle={product.subtitle}
                logo={product.logo}
                bannerImage={product.bannerImage}
            />
            {product.blocks.map(renderBlock)}
            <PageSectionCard sectionId={CONTACTS_SECTION_ID}>
                <Heading level={2}>Contacts form</Heading>
            </PageSectionCard>
        </PageLayout>
    )
}
