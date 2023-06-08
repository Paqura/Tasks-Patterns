import React, { useState } from 'react'

import { CardsSlider } from '@/components/ui/CardsSlider'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { CONTACTS_SECTION_ID } from '@/utils/constants'
import { scrollToSection } from '@/utils/scrollToSection'
import {
    postFeedbackRequest,
    postPartnershipRequest,
    postPilotApplicationRequest,
} from '@/utils/siteApi'

import { CardRadio } from './components/CardRadio'
import {
    CommonForm,
    TCommonFormData,
    TTypeForm,
    TFormFields,
    TSelectProductOptions,
} from './components/CommonForm'
import styles from './index.module.scss'

import { PageSectionCard } from 'src/components/ui/PageSectionCard'

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
    selectedProduct?: string
    anyQuestionData: TAnyQuestionsData
}

export const AnyQuestions: React.FC<TAnyQuestionsProps> = ({
    sectionId = CONTACTS_SECTION_ID,
    selectedProduct,
    anyQuestionData,
}) => {
    const { title, description, feedback, partnership, pilotApplication, selectProductOptions } =
        anyQuestionData
    const [tab, setTab] = useState<TTypeForm>('feedback')
    const [isCompleted, setIsCompleted] = useState<boolean>(false)

    const onSubmit = async (data: TFormFields) => {
        let isSuccess = false
        switch (tab) {
            case 'feedback':
                isSuccess = await postFeedbackRequest({
                    fullName: data.fullName,
                    email: data.email,
                    phone: data.phone,
                    comment: data.comment,
                })
                break
            case 'partnership':
                isSuccess = await postPartnershipRequest({
                    address: data.address,
                    fullName: data.fullName,
                    email: data.email,
                    phone: data.phone,
                    companyName: data.companyName,
                    comment: data.comment,
                })
                break
            case 'pilotApplication':
                isSuccess = await postPilotApplicationRequest({
                    product: data.product,
                    fullName: data.fullName,
                    email: data.email,
                    phone: data.phone,
                    companyName: data.companyName,
                    comment: data.comment,
                })
                break
        }

        if (isSuccess) {
            setIsCompleted(true)
            scrollToSection(sectionId)
        }
    }

    const getSetTab = (tab: TTypeForm) => () => {
        setTab(tab)
        scrollToSection(sectionId)
    }

    return (
        <PageSectionCard mode="light" sectionId={sectionId} className={styles.container}>
            <div className={styles.heading}>
                <Heading className={styles.title} level={1}>
                    {title}
                </Heading>
                <Text type={'pL'}>{description}</Text>
            </div>
            <div className={styles.content}>
                {isCompleted || (
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
                )}
                <CommonForm
                    type={tab}
                    feedback={feedback}
                    partnership={partnership}
                    pilotApplication={pilotApplication}
                    selectProductOptions={selectProductOptions}
                    selectedProduct={selectedProduct}
                    onSubmit={onSubmit}
                    isCompleted={isCompleted}
                />
            </div>
        </PageSectionCard>
    )
}
