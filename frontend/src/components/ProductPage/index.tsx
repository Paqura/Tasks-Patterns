import { AnchorBar, TAnchorLink } from '@/components/AnchorBar'
import { THeaderData } from '@/components/Header'
import { PageLayout, TSeo } from '@/components/PageLayout'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Heading } from '@/components/ui/typography/Heading'
import { PageAnchorsContextProvider } from '@/utils/anchors'
import { CONTACTS_SECTION_ID } from '@/utils/constants'

import { Banner } from './components/Banner'
import { FaqBlock } from './components/FaqBlock'
import { FilesBlock } from './components/FilesBlock'
import { ImagedCardsGridBlock } from './components/ImagedCardsGridBlock'
import { ImagesSliderBlock } from './components/ImagesSliderBlock'
import { TasksBlock } from './components/TasksBlock'
import { WelcomeToPilotBlock } from './components/WelcomeToPilotBlock'
import { TProductData, TSectionCardParams } from './types'

export type TProductPageData = {
    seo: TSeo
    header: THeaderData
    product: TProductData
}

export type TProductPageProps = TProductPageData

type TBlocksAcc = {
    lastNumber: number
    blocks: React.ReactElement[]
    anchors: TAnchorLink[]
}
export const ProductPage: React.FC<TProductPageProps> = ({ product, header, seo }) => {
    const getAnchorLink = (
        block: { data: { title: string } } & TSectionCardParams
    ): TAnchorLink => ({
        name: block.data.title,
        link: block.sectionId,
    })
    const blocksAcc = product.blocks.reduce<TBlocksAcc>(
        (acc, block, index) => {
            switch (block.type) {
                case 'tasks':
                    acc.lastNumber = acc.lastNumber + 1
                    acc.blocks.push(
                        <TasksBlock key={index} data={block.data} sectionId={block.sectionId} />
                    )
                    acc.anchors.push(getAnchorLink(block))
                    break
                case 'imaged-cards-grid':
                    acc.lastNumber = acc.lastNumber + 1
                    acc.blocks.push(
                        <ImagedCardsGridBlock
                            number={acc.lastNumber}
                            key={index}
                            data={block.data}
                            sectionId={block.sectionId}
                        />
                    )
                    acc.anchors.push(getAnchorLink(block))
                    break
                case 'images-slider':
                    acc.lastNumber = acc.lastNumber + 1
                    acc.blocks.push(
                        <ImagesSliderBlock
                            number={acc.lastNumber}
                            key={index}
                            data={block.data}
                            sectionId={block.sectionId}
                        />
                    )
                    acc.anchors.push(getAnchorLink(block))
                    break
                case 'faq': {
                    acc.lastNumber = acc.lastNumber + 1
                    acc.blocks.push(
                        <FaqBlock
                            number={acc.lastNumber}
                            data={block.data}
                            sectionId={block.sectionId}
                        />
                    )
                    acc.anchors.push(getAnchorLink(block))
                    break
                }
                case 'welcome-to-pilot':
                    acc.lastNumber = acc.lastNumber + 1
                    acc.blocks.push(<WelcomeToPilotBlock key={index} data={block.data} />)
                    break
                case 'files':
                    acc.lastNumber = acc.lastNumber + 1
                    acc.blocks.push(
                        <FilesBlock
                            number={acc.lastNumber}
                            key={index}
                            data={block.data}
                            sectionId={block.sectionId}
                        />
                    )
                    acc.anchors.push(getAnchorLink(block))
                    break
                default:
                    break
            }
            return acc
        },
        { blocks: [], anchors: [], lastNumber: 0 }
    )

    return (
        <PageLayout seo={seo} navItems={header.navItems}>
            <PageAnchorsContextProvider>
                <Banner
                    title={product.title}
                    subtitle={product.subtitle}
                    logo={product.logo}
                    bannerImage={product.bannerImage}
                />
                <AnchorBar anchors={blocksAcc.anchors} />
                {blocksAcc.blocks}
                <PageSectionCard sectionId={CONTACTS_SECTION_ID}>
                    <Heading level={2}>Contacts form</Heading>
                </PageSectionCard>
            </PageAnchorsContextProvider>
        </PageLayout>
    )
}
