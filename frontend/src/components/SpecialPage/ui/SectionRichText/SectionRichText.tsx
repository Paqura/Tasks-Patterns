import cn from 'classnames'
import Image from 'next/image'

import { TThemeMode } from '../../lib/types'
import { SectionThemed } from '../SectionThemed'
import { MarkdownContent } from '@/components/ui/MarkdownContent'
import { TImage } from '@/types'

import styles from './index.module.scss'

export type TBlockRichText = {
    type: 'richText'
    theme: TThemeMode
    content: string
    backgroundImage: TNullable<TImage>
}

type TSectionRichTextProps = {
    id: string
    data: TBlockRichText
}

export const SectionRichText = ({ id, data }: TSectionRichTextProps) => {
    const { theme, backgroundImage, content } = data

    const mode = theme === 'light' || theme === 'dark' ? theme : 'light'

    return (
        <SectionThemed id={id} theme={theme}>
            <MarkdownContent
                mode={mode}
                className={cn(styles.markdown, {
                    [styles.markdownDark]: theme === 'dark',
                    [styles.transparentLight]: theme === 'transparent-light',
                    [styles.transparentDark]: theme === 'transparent-dark',
                })}
            >
                {content}
            </MarkdownContent>

            {backgroundImage && (
                <Image
                    className={styles.blockImage}
                    alt=""
                    src={backgroundImage.src}
                    fill
                    unoptimized
                />
            )}
        </SectionThemed>
    )
}
