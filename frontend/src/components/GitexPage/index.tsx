import cn from 'classnames'
import Image from 'next/image'
import NextLink from 'next/link'

import { AnyQuestions, TAnyQuestionsData } from '@/components/AnyQuestions'
import { PageLayout, TSeo } from '@/components/PageLayout'
import { ImagesSlider, TSlide } from '@/components/ui/ImagesSlider'
import { MarkdownContent } from '@/components/ui/MarkdownContent'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { TImage, TVideo } from '@/types'

import styles from './index.module.scss'

type TCardMode = 'light' | 'dark'

type TBlockRichText = {
    type: 'richText'
    theme: TCardMode
    content: string
    backgroundImage: TImage | null
}

type TBlockSlider = {
    type: 'slider'
    theme: TCardMode
    slides: TSlide[]
}

type TBlock = TBlockRichText | TBlockSlider

type TGitexData = {
    backgroundVideo: TVideo | null
    backgroundImage: TImage | null

    blocks: TBlock[]
}

export type TGitexPageProps = {
    seo: TSeo
    anyQuestionsData: TAnyQuestionsData
    gitexData: TGitexData
}

export const GitexPage = ({ seo, gitexData, anyQuestionsData }: TGitexPageProps) => {
    return (
        <PageLayout seo={seo} className={styles.root}>
            <header className={styles.header}>
                <NextLink href="/" className={styles.logo}>
                    <Image
                        className={styles.image}
                        fill
                        src="/images/logo/logoDesktop.svg"
                        alt={''}
                    />
                </NextLink>
            </header>

            {gitexData.backgroundVideo?.src && (
                <video muted loop autoPlay playsInline preload="metadata" className={styles.video}>
                    <source src={gitexData.backgroundVideo.src} />
                </video>
            )}

            {gitexData.backgroundImage?.src && (
                <Image
                    src={gitexData.backgroundImage.src}
                    width={gitexData.backgroundImage.width}
                    height={gitexData.backgroundImage.height}
                    className={styles.image}
                    alt=""
                />
            )}

            <div className={styles.content}>
                {gitexData.blocks.map((block, idx) => {
                    switch (block.type) {
                        case 'richText':
                            return (
                                <PageSectionCard
                                    mode={block.theme}
                                    key={idx}
                                    sectionId={String(idx)}
                                >
                                    <MarkdownContent
                                        mode={block.theme}
                                        className={cn({
                                            [styles.markdownDark]: block.theme === 'dark',
                                        })}
                                    >
                                        {block.content}
                                    </MarkdownContent>

                                    {block.backgroundImage && (
                                        <Image
                                            className={styles.blockImage}
                                            alt=""
                                            src={block.backgroundImage.src}
                                            fill
                                        />
                                    )}
                                </PageSectionCard>
                            )

                        case 'slider':
                            return (
                                <PageSectionCard
                                    key={idx}
                                    mode={block.theme}
                                    sectionId={String(idx)}
                                >
                                    <ImagesSlider
                                        slides={block.slides}
                                        scrollAreaClassName={styles.sliderScrollArea}
                                    />
                                </PageSectionCard>
                            )
                        default:
                            return null
                    }
                })}

                <AnyQuestions showSlider={false} anyQuestionData={anyQuestionsData} />
            </div>
        </PageLayout>
    )
}
