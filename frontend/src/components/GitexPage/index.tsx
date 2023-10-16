import cn from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

import { PageLayout, TSeo } from '@/components/PageLayout'
import { MarkdownContent } from '@/components/ui/MarkdownContent'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { TImage, TVideo } from '@/types'
import { postGitexInviteRequest } from '@/utils/siteApi'
import { useLocale } from '@/utils/translate'
import { useYaMetricaGitex } from '@/utils/yaMetrica/gitex'

import { AnyQuestions, TAnyQuestionsData } from './components/AnyQuestions'
import { Header } from './components/Header'
import { ImagesSlider, TSlide } from './components/ImagesSlider'
import { InviteForm, TGitexInviteFormFields, TInviteFormData } from './components/InviteForm'
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

type TBlockInviteForm = {
    type: 'inviteForm'

    backgroundImage: TImage | null
} & TInviteFormData

type TBlock = TBlockRichText | TBlockSlider | TBlockRichSlider | TBlockInviteForm

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
    const [isCompleted, setIsCompleted] = useState(false)
    const locale = useLocale()

    useYaMetricaGitex()

    const onSubmit = async (data: TGitexInviteFormFields) => {
        const isSuccess = await postGitexInviteRequest({
            fullName: data.fullName || '',
            email: data.email || '',
            company: data.company || '',
            message: data.message || '',
            recipientEmail: data.recipientEmail || '',

            locale,
        })
        if (isSuccess) {
            setIsCompleted(true)
        }
    }

    return (
        <PageLayout seo={seo} className={styles.root}>
            <PageBackground
                backgroundImage={gitexData.backgroundImage}
                backgroundVideo={gitexData.backgroundVideo}
            />

            <Header />

            <div>
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

                        {section.blocks.map((block, blockIdx) => {
                            if (block.type === 'inviteForm') {
                                const { backgroundImage, ...formData } = block
                                return (
                                    <PageSectionCard
                                        sectionClassName={styles.card}
                                        key={blockIdx}
                                        sectionId="inviteForm"
                                    >
                                        <InviteForm
                                            isCompleted={isCompleted}
                                            onSubmit={onSubmit}
                                            formData={formData}
                                        />

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
                            }

                            const mode =
                                block.theme === 'light' || block.theme === 'dark'
                                    ? block.theme
                                    : 'light'

                            switch (block.type) {
                                case 'richText':
                                    return (
                                        <PageSectionCard
                                            mode={mode}
                                            key={`${idx}-${blockIdx}`}
                                            sectionId={String(idx)}
                                            sectionClassName={cn(styles.card, {
                                                [styles.transparentLight]:
                                                    block.theme === 'transparent-light',
                                                [styles.transparentDark]:
                                                    block.theme === 'transparent-dark',
                                            })}
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
                                            key={`${idx}-${blockIdx}`}
                                        />
                                    )

                                case 'slider':
                                    return (
                                        <PageSectionCard
                                            key={`${idx}-${blockIdx}`}
                                            mode={mode}
                                            sectionId={String(idx)}
                                            sectionClassName={cn(styles.card, {
                                                [styles.transparentLight]:
                                                    block.theme === 'transparent-light',
                                                [styles.transparentDark]:
                                                    block.theme === 'transparent-dark',
                                            })}
                                            contentClassName={cn(styles.sliderContent)}
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
