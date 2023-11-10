import map from 'lodash/map'
import { useState } from 'react'
import * as tsPattern from 'ts-pattern'

import { postSpecialPageInviteRequest } from '@/shared/lib/siteApi'
import { useLocale } from '@/shared/lib/translate'
import { PageLayout, TSeo } from '@/shared/ui/project/PageLayout'

import styles from './index.module.scss'
import type { TSpecialPageData } from './lib/types'
import { useYaMetricSpecialPage } from './lib/yaMetric'
import { AnyQuestions, TAnyQuestionsData } from './ui/AnyQuestions'
import { Header } from './ui/Header'
import type { TInviteFormFields } from './ui/InviteForm'
import { PageBackground } from './ui/PageBackground'
import { SectionBackground } from './ui/SectionBackground'
import { SectionImagesSlider } from './ui/SectionImagesSlider'
import { SectionInviteForm } from './ui/SectionInviteForm'
import { SectionRichSlider } from './ui/SectionRichSlider'
import { SectionRichText } from './ui/SectionRichText'

export type TSpecialScreenProps = {
    seo: TSeo
    anyQuestionsData: TAnyQuestionsData
    specialPageData: TSpecialPageData
}

export const SpecialScreen = ({ seo, specialPageData, anyQuestionsData }: TSpecialScreenProps) => {
    const locale = useLocale()

    const { backgroundImage, backgroundVideo, sections } = specialPageData

    const [isCompleted, setIsCompleted] = useState(false)

    useYaMetricSpecialPage()

    const onSubmit = async (data: TInviteFormFields) => {
        const isSuccess = await postSpecialPageInviteRequest({
            fullName: data.fullName || '',
            email: data.email || '',
            company: data.company || '',
            message: data.message || '',
            recipientEmail: data.recipientEmail || '',
            emailTemplateName: data.emailTemplateName || '',
            slug: data.slug,

            locale,
        })

        if (isSuccess) {
            setIsCompleted(true)
        }
    }

    return (
        <PageLayout seo={seo} className={styles.root}>
            <PageBackground backgroundImage={backgroundImage} backgroundVideo={backgroundVideo} />

            <Header />

            <main>
                {map(sections, ({ background, blocks }, idx) => (
                    <div className={styles.section} key={idx}>
                        <SectionBackground data={background} />

                        {map(blocks, (block, blockIdx) => {
                            const key = `${idx}-${blockIdx}`

                            return tsPattern
                                .match(block)
                                .with({ type: 'inviteForm' }, (block) => (
                                    <SectionInviteForm
                                        key={key}
                                        data={block}
                                        isCompleted={isCompleted}
                                        onSubmit={onSubmit}
                                    />
                                ))
                                .with({ type: 'richText' }, (block) => (
                                    <SectionRichText key={key} id={key} data={block} />
                                ))
                                .with({ type: 'richSlider' }, (block) => (
                                    <SectionRichSlider key={key} id={key} data={block} />
                                ))
                                .with({ type: 'slider' }, (block) => (
                                    <SectionImagesSlider key={key} id={key} data={block} />
                                ))
                                .exhaustive()
                        })}
                    </div>
                ))}

                <AnyQuestions anyQuestionData={anyQuestionsData} />
            </main>
        </PageLayout>
    )
}
