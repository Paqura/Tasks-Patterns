import { GetAttributesValues } from '@admin/general-schemas'

import { TBlock, TSpecialPageData } from '@/screens/special'
import { TSlide } from '@/shared/ui/common/ImagesSlider'
import { TImage, TVideo } from '@/types'

import { mapImageMediaFile, mapVideoMediaFile } from './media'

type TResponseBlocks = Exclude<GetAttributesValues<'api::sp.sp'>['blocks'], undefined>

type TResponseBlock = TResponseBlocks[number]

type TResponseVisualBlock = Exclude<TResponseBlock, { __component: 'share.section-start' }>

const mapBlock = (block: TResponseVisualBlock): TBlock => {
    if (block.__component === 'share.content-block') {
        return {
            type: 'richText',
            theme: block.theme ?? 'light',
            content: block.content ?? '',
            backgroundImage: mapImageMediaFile(block.backgroundImage),
        }
    }

    if (block.__component === 'share.rich-slider') {
        return {
            type: 'richSlider',

            theme: block.theme ?? 'light',

            slides: (block.richSlider ?? []).map((s) => s.content ?? ''),
        }
    }

    if (block.__component === 'share.slider-block') {
        return {
            type: 'slider',
            theme: block.theme ?? 'light',
            slides: (block.slides ?? []).reduce<TSlide[]>((acc, slide) => {
                const image = mapImageMediaFile(slide.image)

                if (!image) return acc

                const slideProps = {
                    image,
                    caption: slide.caption ?? '',
                }

                acc.push(slideProps)

                return acc
            }, []),
        }
    }

    if (block.__component === 'share.invite-form') {
        return {
            type: 'inviteForm',
            companyPlaceholder: block.companyPlaceholder ?? '',
            companyRequired: block.companyRequired ?? true,
            emailPlaceholder: block.emailPlaceholder ?? '',
            emailRequired: block.emailRequired ?? true,
            messagePlaceholder: block.messagePlaceholder ?? '',
            messageRequired: block.messageRequired ?? true,
            namePlaceholder: block.namePlaceholder ?? '',
            nameRequired: block.nameRequired ?? true,
            backgroundImage: mapImageMediaFile(block.backgroundImage),
            successMessageDescription: block.successMessageDescription ?? '',
            successMessageTitle: block.successMessageTitle ?? '',
            submitButtonText: block.submitButtonText ?? '',
            checkboxConsentsTerms: block.checkboxConsentsTerms ?? '',
            recipientEmail: block.recipientEmail ?? '',
            emailTemplateName: block.emailTemplateName || '',
        }
    }

    const _never: never = block

    throw new Error(`Unexpected block ${JSON.stringify(_never, null, 2)}`)
}

type TSectionMeta = {
    order: number
    image: TImage | null
    video: TVideo | null
}

export const mapSpecialPageServerData = (
    serverData: GetAttributesValues<'api::sp.sp'>,
): TSpecialPageData => {
    const blocksData: TSpecialPageData['sections'] = []

    let currentSectionMeta: TSectionMeta = {
        order: -1,
        image: null,
        video: null,
    }

    for (const block of serverData.blocks ?? []) {
        if (block.__component === 'share.section-start') {
            currentSectionMeta.image = mapImageMediaFile(block.backgroundImage)
            currentSectionMeta.video = mapVideoMediaFile(block.backgroundVideo)

            currentSectionMeta.order = currentSectionMeta.order + 1

            continue
        }

        const { order, ...background } = currentSectionMeta
        const prevBlockState = blocksData[order]?.blocks ?? []

        blocksData[order] = {
            background,
            blocks: prevBlockState.concat([mapBlock(block)]),
        }
    }

    return {
        backgroundImage: mapImageMediaFile(serverData.pageBackgroundImage),
        backgroundVideo: mapVideoMediaFile(serverData.pageBackgroundVideo),
        sections: blocksData,
    }
}
