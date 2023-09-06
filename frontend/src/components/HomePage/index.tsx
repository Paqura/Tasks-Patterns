import Head from 'next/head'

import { AnchorBar, TAnchorLink } from '@/components/AnchorBar'
import { AnyQuestions, TAnyQuestionsData } from '@/components/AnyQuestions'
import { TFooterData } from '@/components/Footer'
import { THeaderData } from '@/components/Header'
import { PageLayout, TSeo } from '@/components/PageLayout'
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
    footerData: TFooterData
    blocks: THomePageBlocksData[]
    contactsAnchorText: string
    anyQuestionsData: TAnyQuestionsData
}

export type THomePageProps = THomePageData

type TBlocksAcc = {
    lastNumber: number
    blocks: React.ReactElement[]
    anchors: TAnchorLink[]
}

export const HomePage: React.FC<THomePageProps> = (props) => {
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
        { blocks: [], anchors: [], lastNumber: 0 }
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
