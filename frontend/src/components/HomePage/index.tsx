import { AnchorBar, TAnchorLink } from '@/components/AnchorBar'
import { THeaderData } from '@/components/Header'
import { PageLayout, TSeo } from '@/components/PageLayout'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Heading } from '@/components/ui/typography/Heading'
import { TWithSectionParams } from '@/types'
import { PageAnchorsContextProvider } from '@/utils/anchors'
import { CONTACTS_SECTION_ID } from '@/utils/constants'

import { Advantages, TAdvantagesBlockData } from './components/Advantages'
import { Analytics, TAnalyticBlocksData } from './components/Analytics'
import { Banner, TBannerData } from './components/Banner'
import { News, TNewsBlockData } from './components/News'
import { Products, TProductsBlockData } from './components/Products'
import { TToolsBlockData, Tools } from './components/Tools'

export type THomePageBlocksData =
    | {
          type: 'advantages'
          data: TAdvantagesBlockData
      }
    | {
          type: 'tools'
          data: TToolsBlockData
      }
    | {
          type: 'products'
          data: TProductsBlockData
      }
    | {
          type: 'analytics'
          data: TAnalyticBlocksData
      }
    | {
          type: 'news'
          data: TNewsBlockData
      }

export type THomePageData = {
    seo: TSeo
    headingBlock: TBannerData
    headerData: THeaderData
    blocks: THomePageBlocksData[]
}

export type THomePageProps = THomePageData

type TBlocksAcc = {
    lastNumber: number
    blocks: React.ReactElement[]
    anchors: TAnchorLink[]
}

const contactsAcnhor: TAnchorLink = {
    name: 'Contact',
    link: 'contact',
}

export const HomePage: React.FC<THomePageProps> = (props) => {
    const getAnchorLink = (block: { data: TWithSectionParams }): TAnchorLink => ({
        name: block.data.title,
        link: block.data.sectionId,
    })

    const blocksAcc = props.blocks.reduce<TBlocksAcc>(
        (acc, block, index) => {
            switch (block.type) {
                case 'advantages':
                    acc.blocks.push(<Advantages key={index} data={block.data} />)
                    acc.anchors.push(getAnchorLink(block))
                    break
                case 'tools':
                    acc.blocks.push(<Tools key={index} data={block.data} />)
                    acc.anchors.push(getAnchorLink(block))
                    break
                case 'products':
                    acc.blocks.push(<Products key={index} data={block.data} />)
                    acc.anchors.push(getAnchorLink(block))
                    break
                case 'analytics':
                    acc.blocks.push(<Analytics key={index} data={block.data} />)
                    acc.anchors.push(getAnchorLink(block))
                    break
                case 'news':
                    acc.blocks.push(<News key={index} data={block.data} />)
                    acc.anchors.push(getAnchorLink(block))
                    break
                default:
                    break
            }
            return acc
        },
        { blocks: [], anchors: [], lastNumber: 0 }
    )

    const anchors = [...blocksAcc.anchors, contactsAcnhor]
    return (
        <PageLayout seo={props.seo} headerData={props.headerData}>
            <PageAnchorsContextProvider>
                <Banner data={props.headingBlock} />
                <AnchorBar anchors={anchors} />
                {blocksAcc.blocks}
                <PageSectionCard sectionId={CONTACTS_SECTION_ID}>
                    <Heading level={2}>Contacts form</Heading>
                </PageSectionCard>
            </PageAnchorsContextProvider>
        </PageLayout>
    )
}
