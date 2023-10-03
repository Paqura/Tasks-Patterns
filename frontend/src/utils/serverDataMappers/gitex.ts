import { GetAttributesValues } from '@admin/general-schemas'

import { TGitexPageProps } from '@/components/GitexPage'
import { TSlide } from '@/components/ui/ImagesSlider'

import { mapImageMediaFile, mapVideoMediaFile } from './media'

export const mapGitexServerData = (
    serverData: GetAttributesValues<'api::gtex-page.gtex-page'>
): TGitexPageProps['gitexData'] => {
    return {
        backgroundImage: mapImageMediaFile(serverData.pageBackgroundImage),
        backgroundVideo: mapVideoMediaFile(serverData.pageBackgroundVideo),
        blocks: (serverData.blocks ?? []).map((block) => {
            if (block.__component === 'share.content-block') {
                return {
                    type: 'richText',
                    theme: block.theme ?? 'light',
                    content: block.content ?? '',
                    backgroundImage: mapImageMediaFile(block.backgroundImage),
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

            throw new Error('Unexpected component')
        }),
    }
}
