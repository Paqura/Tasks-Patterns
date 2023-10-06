import { GetAttributesValues } from '@admin/general-schemas'

import { TGitexData } from '@/components/GitexPage'
import { TSlide } from '@/components/ui/ImagesSlider'
import { TImage, TVideo } from '@/types'

import { mapImageMediaFile, mapVideoMediaFile } from './media'

type TCurrentSectionMeta = {
    order: number
} & {
    image: TImage | null
    video: TVideo | null
}

type TResponseBlock = Exclude<
    GetAttributesValues<'api::gtex-page.gtex-page'>['blocks'],
    undefined
>[number]

const mapBlock = (
    block: Exclude<TResponseBlock, { __component: 'share.section-start' }>
): TGitexData['sections'][number]['blocks'][number] => {
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
        }
    }

    throw new Error('Unexpected component')
}

export const mapGitexServerData = (
    serverData: GetAttributesValues<'api::gtex-page.gtex-page'>
): TGitexData => {
    const blocksData: TGitexData['sections'] = []

    let currentSectionMeta: TCurrentSectionMeta = {
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
