import { useState } from 'react'
import { match } from 'ts-pattern'

import { CONTACTS_SECTION_ID } from '@/shared/lib/constants'
import { scrollToSection } from '@/shared/lib/scrollToSection'
import { CardsSlider } from '@/shared/ui/common/CardsSlider'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { FormSuccess } from '@/shared/ui/project/FormSuccess'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'
import { useHandleFormSend } from './lib/sendForm'
import { CardRadio } from './ui/CardRadio'
import { FeedbackForm, TFeedbackFormData } from './ui/FeedbackForm'
import { PartnershipForm } from './ui/PartnershipForm'
import { TPartnershipFormData } from './ui/PartnershipForm/PartnershipForm'
import { PilotAppForm, TPilotAppFormData, TSelectProductOptions } from './ui/PilotAppForm'

export type TTypeForm = 'feedback' | 'partnership' | 'pilotApplication'

export type TAnyQuestionsData = {
    title: string
    description: string
    feedback: TFeedbackFormData
    partnership: TPartnershipFormData
    pilotApplication: TPilotAppFormData
    selectProductOptions: TSelectProductOptions
    recipientEmail: string | undefined
}

type TAnyQuestionsProps = {
    sectionId?: string
    hasAnimation?: boolean
    selectedProduct?: string
    anyQuestionData: TAnyQuestionsData

    useFormSend?: typeof useHandleFormSend
}

export const AnyQuestions = ({
    sectionId = CONTACTS_SECTION_ID,
    hasAnimation = true,
    selectedProduct,
    anyQuestionData,
    useFormSend = useHandleFormSend,
}: TAnyQuestionsProps) => {
    const {
        title,
        description,
        feedback,
        partnership,
        pilotApplication,
        selectProductOptions,
        recipientEmail,
    } = anyQuestionData
    const [tab, setTab] = useState<TTypeForm>('feedback')

    const { handleFeedbackSubmit, handlePartnershipSubmit, handlePilotAppSubmit, isCompleted } =
        useFormSend({
            recipientEmail,
            sectionId,
        })

    const getSetTab = (tab: TTypeForm) => () => {
        setTab(tab)
        scrollToSection(sectionId)
    }

    const successFormLabels = {
        feedback,
        partnership,
        pilotApplication,
    }[tab]

    return (
        <PageSection.Card
            mode="light"
            sectionId={sectionId}
            contentClassName={styles.container}
            hasAnimation={hasAnimation}
        >
            <div className={styles.heading}>
                <Heading className={styles.title} level={1}>
                    {title}
                </Heading>

                <Text type={'pL'}>{description}</Text>
            </div>

            <div className={styles.content}>
                {isCompleted && (
                    <FormSuccess
                        title={successFormLabels.successTitle}
                        description={successFormLabels.successDescription}
                    />
                )}

                {!isCompleted && (
                    <>
                        <CardsSlider
                            hideControls
                            className={styles.radioGroupWrapper}
                            scrollAreaClassName={styles.radioGroup}
                        >
                            <CardRadio
                                title={feedback.title}
                                description={feedback.description}
                                value={'feedback'}
                                checked={tab === 'feedback'}
                                onChange={getSetTab('feedback')}
                            />
                            <CardRadio
                                title={partnership.title}
                                description={partnership.description}
                                value={'partnership'}
                                checked={tab === 'partnership'}
                                onChange={getSetTab('partnership')}
                            />
                            <CardRadio
                                title={pilotApplication.title}
                                description={pilotApplication.description}
                                value={'pilotApplication'}
                                checked={tab === 'pilotApplication'}
                                onChange={getSetTab('pilotApplication')}
                            />
                        </CardsSlider>

                        {match(tab)
                            .with('feedback', () => (
                                <FeedbackForm data={feedback} onSubmit={handleFeedbackSubmit} />
                            ))
                            .with('partnership', () => (
                                <PartnershipForm
                                    data={partnership}
                                    onSubmit={handlePartnershipSubmit}
                                />
                            ))
                            .with('pilotApplication', () => (
                                <PilotAppForm
                                    data={pilotApplication}
                                    selectedProduct={selectedProduct}
                                    selectProductOptions={selectProductOptions}
                                    onSubmit={handlePilotAppSubmit}
                                />
                            ))
                            .exhaustive()}
                    </>
                )}
            </div>
        </PageSection.Card>
    )
}
