import { useState } from 'react'

import { CONTACTS_SECTION_ID } from '@/shared/lib/constants'
import { scrollToSection } from '@/shared/lib/scrollToSection'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { PageSection } from '@/shared/ui/project/PageSection'

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
        <PageSection.Card
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
        </PageSection.Card>
    )
}
