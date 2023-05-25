import { THeaderData } from '@/components/Header'
import { PageLayout, TSeo } from '@/components/PageLayout'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Heading } from '@/components/ui/typography/Heading'
import { CONTACTS_SECTION_ID } from '@/utils/constants'

import { Banner } from './components/Banner'
import { FaqBlock } from './components/FaqBlock'
import { ImagedCardsGridBlock } from './components/ImagedCardsGridBlock'
import { ImagesSliderBlock } from './components/ImagesSliderBlock'
import { TasksBlock } from './components/TasksBlock'
import { TProductData, TProductsBlockData } from './types'

export type TProductPageData = {
    seo: TSeo
    header: THeaderData
    product: TProductData
}

export type TProductPageProps = TProductPageData

export const ProductPage: React.FC<TProductPageProps> = ({ product, header, seo }) => {
    const renderBlock = (block: TProductsBlockData, index: number) => {
        switch (block.type) {
            case 'tasks':
                return <TasksBlock key={index} data={block.data} sectionId={block.sectionId} />
            case 'imaged-cards-grid':
                return (
                    <ImagedCardsGridBlock
                        key={index}
                        data={block.data}
                        sectionId={block.sectionId}
                    />
                )
            case 'images-slider':
                return (
                    <ImagesSliderBlock key={index} data={block.data} sectionId={block.sectionId} />
                )
            case 'faq':
                return <FaqBlock key={index} data={block.data} sectionId={block.sectionId} />
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
