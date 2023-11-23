import { PageAnchorsContextProvider } from '@/shared/lib/anchors'
import { CONTACTS_SECTION_ID } from '@/shared/lib/constants'
import { AnchorBar, TAnchorLink } from '@/shared/ui/project/AnchorBar'
import { PageLayout, TSeo } from '@/shared/ui/project/PageLayout'
import { AnyQuestions, TAnyQuestionsData } from '@/widgets/AnyQuestions'
import { TFooterData } from '@/widgets/Footer'
import { THeaderData } from '@/widgets/Header'

import { TProductData, TSectionCardParams } from './types'
import { Banner } from './ui/Banner'
import { FaqBlock } from './ui/FaqBlock'
import { FilesBlock } from './ui/FilesBlock'
import { ImagedCardsGridBlock } from './ui/ImagedCardsGridBlock'
import { ImagesSliderBlock } from './ui/ImagesSliderBlock'
import { OtherProductsBlock } from './ui/OtherProductsBlock'
import { OverviewBlock } from './ui/OverviewBlock'
import { TasksBlock } from './ui/TasksBlock'
import { WelcomeToPilotBlock } from './ui/WelcomeToPilotBlock'

export type TProductScreenData = {
    seo: TSeo
    headerData: THeaderData
    footerData: TFooterData
    product: TProductData
    anyQuestionsData: TAnyQuestionsData
}

export type TProductScreenProps = TProductScreenData

type TBlocksAcc = {
    lastNumber: number
    blocks: React.ReactElement[]
    anchors: TAnchorLink[]
}
export const ProductScreen = ({
    seo,
    headerData,
    footerData,
    product,
    anyQuestionsData,
}: TProductScreenProps) => {
    const getAnchorLink = (
        block: { data: { title: string } } & TSectionCardParams,
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
                        <TasksBlock key={index} data={block.data} sectionId={block.sectionId} />,
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
                        />,
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
                        />,
                    )
                    acc.anchors.push(getAnchorLink(block))
                    break
                case 'faq': {
                    acc.lastNumber = acc.lastNumber + 1
                    acc.blocks.push(
                        <FaqBlock
                            key={index}
                            number={acc.lastNumber}
                            data={block.data}
                            sectionId={block.sectionId}
                        />,
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
                        />,
                    )
                    acc.anchors.push(getAnchorLink(block))
                    break
                case 'other-products':
                    acc.lastNumber = acc.lastNumber + 1
                    acc.blocks.push(
                        <OtherProductsBlock
                            number={acc.lastNumber}
                            key={index}
                            data={block.data}
                            sectionId={block.sectionId}
                        />,
                    )
                    acc.anchors.push(getAnchorLink(block))
                    break
                case 'overview':
                    acc.lastNumber = acc.lastNumber + 1
                    acc.blocks.push(
                        <OverviewBlock
                            number={acc.lastNumber}
                            key={index}
                            data={block.data}
                            sectionId={block.sectionId}
                        />,
                    )
                    acc.anchors.push(getAnchorLink(block))
                    break
                default:
                    break
            }
            return acc
        },
        { blocks: [], anchors: [], lastNumber: 0 },
    )

    return (
        <PageLayout seo={seo} headerData={headerData} footerData={footerData}>
            <PageAnchorsContextProvider>
                <Banner
                    title={product.title}
                    subtitle={product.subtitle}
                    bannerImage={product.bannerImage}
                />
                <AnchorBar anchors={blocksAcc.anchors} />
                {blocksAcc.blocks}

                <AnyQuestions
                    selectedProduct={product.title}
                    sectionId={CONTACTS_SECTION_ID}
                    anyQuestionData={anyQuestionsData}
                />
            </PageAnchorsContextProvider>
        </PageLayout>
    )
}
