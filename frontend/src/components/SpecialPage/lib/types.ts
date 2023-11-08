import type { TSectionBackground } from '../ui/SectionBackground'
import type { TBlockSlider } from '../ui/SectionImagesSlider'
import type { TBlockInviteForm } from '../ui/SectionInviteForm'
import type { TBlockRichSlider } from '../ui/SectionRichSlider'
import type { TBlockRichText } from '../ui/SectionRichText'
import { TImage, TVideo } from '@/types'

export type TThemeMode = 'light' | 'dark' | 'transparent-light' | 'transparent-dark'

export type TBlock = TBlockRichText | TBlockSlider | TBlockRichSlider | TBlockInviteForm

export type TSection = {
    background: TSectionBackground

    blocks: TBlock[]
}

export type TSpecialPageData = {
    backgroundVideo: TVideo | null
    backgroundImage: TImage | null
    sections: TSection[]
}
