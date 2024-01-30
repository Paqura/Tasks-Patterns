import Head from 'next/head'

import { CONTACTS_SECTION_ID } from '@/shared/lib/constants'
import { AnchorBar, PageAnchorsContextProvider, TAnchorLink } from '@/shared/ui/project/AnchorBar'
import { PageLayout, TSeo } from '@/shared/ui/project/PageLayout'
import { TWithSectionParams } from '@/types'
import { AnyQuestions, TAnyQuestionsData } from '@/widgets/AnyQuestions'
import { TFooterData } from '@/widgets/Footer'
import { THeaderData } from '@/widgets/Header'

import { Advantages, TAdvantagesBlockData } from './ui/Advantages'
import { Analytics, TAnalyticBlocksData } from './ui/Analytics'
import { Banner, TBannerData } from './ui/Banner'
import { News, TNewsBlockData } from './ui/News'
import { Products, TProductsBlockData } from './ui/Products'
import { TToolsBlockData, Tools } from './ui/Tools'

export type THomeScreenBlocksData =
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

export type THomeScreenData = {
    seo: TSeo
    headingBlock: TBannerData
    headerData: THeaderData
    footerData: TFooterData
    blocks: THomeScreenBlocksData[]
    contactsAnchorText: string
    anyQuestionsData: TAnyQuestionsData
}

export type THomeScreenProps = THomeScreenData

type TBlocksAcc = {
    lastNumber: number
    blocks: React.ReactElement[]
    anchors: TAnchorLink[]
}

export const HomeScreen = (props: THomeScreenProps) => {
    const getAnchorLink = (block: { data: TWithSectionParams }): TAnchorLink => ({
        name: block.data.title,
        link: block.data.sectionId,
    })

    const contactsAnchor: TAnchorLink = {
        name: props.contactsAnchorText,
        link: CONTACTS_SECTION_ID,
    }

    const blocksAcc = props.blocks.reduce<TBlocksAcc>(
        (acc, block, index) => {
            switch (block.type) {
                case 'advantages':
                    acc.blocks.push(<Advantages key={index} data={block.data} number={index + 1} />)
                    acc.anchors.push(getAnchorLink(block))
                    break
                case 'tools':
                    acc.blocks.push(<Tools key={index} data={block.data} number={index + 1} />)
                    acc.anchors.push(getAnchorLink(block))
                    break
                case 'products':
                    acc.blocks.push(<Products key={index} data={block.data} number={index + 1} />)
                    acc.anchors.push(getAnchorLink(block))
                    break
                case 'analytics':
                    acc.blocks.push(<Analytics key={index} data={block.data} number={index + 1} />)
                    acc.anchors.push(getAnchorLink(block))
                    break
                case 'news':
                    acc.blocks.push(<News key={index} data={block.data} number={index + 1} />)
                    acc.anchors.push(getAnchorLink(block))
                    break
                default:
                    break
            }
            return acc
        },
        { blocks: [], anchors: [], lastNumber: 0 },
    )

    const anchors = [...blocksAcc.anchors, contactsAnchor]
    return (
        <PageLayout seo={props.seo} headerData={props.headerData} footerData={props.footerData}>
            <Head>
                {process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_ID && (
                    <meta
                        name="yandex-verification"
                        content={process.env.NEXT_PUBLIC_YANDEX_VERIFICATION_ID}
                    />
                )}
            </Head>

            <PageAnchorsContextProvider>
                <Banner data={props.headingBlock} />
                <AnchorBar anchors={anchors} />
                {blocksAcc.blocks}
                <AnyQuestions anyQuestionData={props.anyQuestionsData} />
            </PageAnchorsContextProvider>
        </PageLayout>
    )
}
