import { GetAttributesValues } from '@admin/general-schemas'

import { TGitexPageProps } from '@/components/GitexPage'

import { mapImageMediaFile, mapVideoMediaFile } from './media'

export const mapGitexServerData = (
    serverData: GetAttributesValues<'api::gtex-page.gtex-page'>
): TGitexPageProps['gitexData'] => {
    return {
        backgroundImage: mapImageMediaFile(serverData.pageBackgroundImage),
        backgroundVideo: mapVideoMediaFile(serverData.pageBackgroundVideo),
        blocks: (serverData.blocks ?? []).map((block) => ({
            theme: block.theme ?? 'light',
            content: block.content ?? '',
            backgroundImage: mapImageMediaFile(block.backgroundImage),
        })),
    }
}
