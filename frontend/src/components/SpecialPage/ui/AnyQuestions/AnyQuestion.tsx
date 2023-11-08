import React, { useState } from 'react'

import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { CONTACTS_SECTION_ID } from '@/utils/constants'
import { scrollToSection } from '@/utils/scrollToSection'

import styles from './index.module.scss'
import { useSendFeedback } from './lib/sendFeedback'
import { Form, TFormData } from './ui/Form'

export type TAnyQuestionsData = {
    title: string
    description: string

    feedback: TFormData
}

type TAnyQuestionsProps = {
    anyQuestionData: TAnyQuestionsData

    sectionId?: string
    hasAnimation?: boolean
    selectedProduct?: string
}

export const AnyQuestions = ({
    sectionId = CONTACTS_SECTION_ID,
    hasAnimation = true,
    anyQuestionData,
}: TAnyQuestionsProps) => {
    const { title, description, feedback: data } = anyQuestionData

    const [isCompleted, setIsCompleted] = useState(false)

    const { handleFeedbackSend } = useSendFeedback({
        onSuccess: () => {
            setIsCompleted(true)
            scrollToSection(sectionId)
        },
    })

    return (
        <PageSectionCard
            mode="light"
            sectionId={sectionId}
            contentClassName={styles.container}
            hasAnimation={hasAnimation}
            sectionClassName={styles.root}
        >
            <header className={styles.heading}>
                <Heading className={styles.title} level={1}>
                    {title}
                </Heading>

                <Text type={'pL'}>{description}</Text>
            </header>

            <div className={styles.content}>
                <Form data={data} onSubmit={handleFeedbackSend} isCompleted={isCompleted} />
            </div>
        </PageSectionCard>
    )
}
