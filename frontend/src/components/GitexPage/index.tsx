import cn from 'classnames'
import Image from 'next/image'

import { PageLayout, TSeo } from '@/components/PageLayout'
import { MarkdownContent } from '@/components/ui/MarkdownContent'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { TImage, TVideo } from '@/types'

import { AnyQuestions, TAnyQuestionsData } from './components/AnyQuestions'
import { Header } from './components/Header'
import { ImagesSlider, TSlide } from './components/ImagesSlider'
import { PageBackground } from './components/PageBackground'
import { RichSlider } from './components/RichSlider'
import styles from './index.module.scss'

export type TThemeMode = 'light' | 'dark' | 'transparent-light' | 'transparent-dark'

type TBlockRichText = {
    type: 'richText'
    theme: TThemeMode
    content: string
    backgroundImage: TImage | null
}

type TBlockSlider = {
    type: 'slider'
    theme: TThemeMode
    slides: TSlide[]
}

type TBlockRichSlider = {
    type: 'richSlider'
    theme: TThemeMode
    slides: string[]
}

type TBlock = TBlockRichText | TBlockSlider | TBlockRichSlider

export type TGitexData = {
    backgroundVideo: TVideo | null
    backgroundImage: TImage | null
    sections: Array<{
        background: {
            image: TImage | null
            video: TVideo | null
        }

        blocks: TBlock[]
    }>
}

export type TGitexPageProps = {
    seo: TSeo
    anyQuestionsData: TAnyQuestionsData
    gitexData: TGitexData
}

export const GitexPage = ({ seo, gitexData, anyQuestionsData }: TGitexPageProps) => {
    return (
        <PageLayout seo={seo} className={styles.root}>
            <PageBackground
                backgroundImage={gitexData.backgroundImage}
                backgroundVideo={gitexData.backgroundVideo}
            />

            <Header />

            <div className={styles.content}>
                {gitexData.sections.map((section, idx) => (
                    <div className={styles.section} key={idx}>
                        {section.background.video?.src && (
                            <video
                                muted
                                loop
                                autoPlay
                                playsInline
                                preload="metadata"
                                className={styles.sectionVideo}
                            >
                                <source src={section.background.video.src} />
                            </video>
                        )}

                        {section.background.image && (
                            <Image
                                src={section.background.image.src}
                                width={section.background.image.width}
                                height={section.background.image.height}
                                className={styles.sectionImage}
                                unoptimized
                                alt=""
                            />
                        )}

                        {section.blocks.map((block) => {
                            const mode =
                                block.theme === 'light' || block.theme === 'dark'
                                    ? block.theme
                                    : 'light'

                            switch (block.type) {
                                case 'richText':
                                    return (
                                        <PageSectionCard
                                            mode={mode}
                                            key={idx}
                                            sectionId={String(idx)}
                                            sectionClassName={cn(styles.card, {
                                                [styles.transparentLight]:
                                                    block.theme === 'transparent-light',
                                                [styles.transparentDark]:
                                                    block.theme === 'transparent-dark',
                                            })}
                                            contentClassName={styles.content}
                                        >
                                            <MarkdownContent
                                                mode={mode}
                                                className={cn({
                                                    [styles.markdownDark]: block.theme === 'dark',
                                                    [styles.transparentLight]:
                                                        block.theme === 'transparent-light',
                                                    [styles.transparentDark]:
                                                        block.theme === 'transparent-dark',
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
                                                    unoptimized
                                                />
                                            )}
                                        </PageSectionCard>
                                    )

                                case 'richSlider':
                                    return (
                                        <RichSlider
                                            theme={block.theme}
                                            sectionId="richSlider"
                                            data={block.slides}
                                            key={idx}
                                        />
                                    )

                                case 'slider':
                                    return (
                                        <PageSectionCard
                                            key={idx}
                                            mode={mode}
                                            sectionId={String(idx)}
                                            sectionClassName={cn(styles.card, {
                                                [styles.transparentLight]:
                                                    block.theme === 'transparent-light',
                                                [styles.transparentDark]:
                                                    block.theme === 'transparent-dark',
                                            })}
                                            contentClassName={cn(
                                                styles.sliderContent,
                                                styles.content
                                            )}
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
                    </div>
                ))}

                <AnyQuestions sectionClassName={styles.card} anyQuestionData={anyQuestionsData} />
            </div>
        </PageLayout>
    )
}
