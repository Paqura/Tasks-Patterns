import cn from 'classnames'
import React, { useState } from 'react'

import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { CONTACTS_SECTION_ID } from '@/utils/constants'
import { scrollToSection } from '@/utils/scrollToSection'
import { postFeedbackRequest } from '@/utils/siteApi'
import { useLocale } from '@/utils/translate'

import {
    CommonForm,
    TCommonFormData,
    TFormFields,
    TSelectProductOptions,
} from './components/CommonForm'
import styles from './index.module.scss'

export type TAnyQuestionsData = {
    title: string
    description: string
    feedback: TCommonFormData
    partnership: TCommonFormData
    pilotApplication: TCommonFormData
    selectProductOptions: TSelectProductOptions
}

type TAnyQuestionsProps = {
    sectionId?: string
    hasAnimation?: boolean
    selectedProduct?: string
    anyQuestionData: TAnyQuestionsData
    sectionClassName?: string
}

export const AnyQuestions: React.FC<TAnyQuestionsProps> = ({
    sectionId = CONTACTS_SECTION_ID,
    hasAnimation = true,
    selectedProduct,
    anyQuestionData,
    sectionClassName,
}) => {
    const { title, description, feedback } = anyQuestionData
    const [isCompleted, setIsCompleted] = useState<boolean>(false)
    const locale = useLocale()

    const onSubmit = async (data: TFormFields) => {
        const isSuccess = await postFeedbackRequest({
            fullName: data.fullName || '',
            email: data.email || '',
            phone: data.phone || '',
            comment: data.comment || '',
            locale,
        })
        if (isSuccess) {
            setIsCompleted(true)
            scrollToSection(sectionId)
        }
    }

    return (
        <PageSectionCard
            mode="light"
            sectionId={sectionId}
            contentClassName={styles.container}
            hasAnimation={hasAnimation}
            sectionClassName={cn(styles.root, sectionClassName)}
        >
            <div className={styles.heading}>
                <Heading className={styles.title} level={1}>
                    {title}
                </Heading>
                <Text type={'pL'}>{description}</Text>
            </div>

            <div className={styles.content}>
                <CommonForm
                    feedback={feedback}
                    selectedProduct={selectedProduct}
                    onSubmit={onSubmit}
                    isCompleted={isCompleted}
                />
            </div>
        </PageSectionCard>
    )
}
