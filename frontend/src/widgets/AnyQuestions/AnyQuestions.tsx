import { useState } from 'react'

import { CONTACTS_SECTION_ID } from '@/shared/lib/constants'
import { scrollToSection } from '@/shared/lib/scrollToSection'
import {
    postFeedbackRequest,
    postPartnershipRequest,
    postPilotApplicationRequest,
} from '@/shared/lib/siteApi'
import { useLocale } from '@/shared/lib/translate'
import { CardsSlider } from '@/shared/ui/common/CardsSlider'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'
import { CardRadio } from './ui/CardRadio'
import {
    CommonForm,
    TCommonFormData,
    TFormFields,
    TSelectProductOptions,
    TTypeForm,
} from './ui/CommonForm'

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
}

export const AnyQuestions = ({
    sectionId = CONTACTS_SECTION_ID,
    hasAnimation = true,
    selectedProduct,
    anyQuestionData,
}: TAnyQuestionsProps) => {
    const { title, description, feedback, partnership, pilotApplication, selectProductOptions } =
        anyQuestionData
    const [tab, setTab] = useState<TTypeForm>('feedback')
    const [isCompleted, setIsCompleted] = useState<boolean>(false)
    const locale = useLocale()

    const onSubmit = async (data: TFormFields) => {
        let isSuccess = false
        switch (tab) {
            case 'feedback':
                isSuccess = await postFeedbackRequest({
                    fullName: data.fullName || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    comment: data.comment || '',
                    locale,
                })
                break
            case 'partnership':
                isSuccess = await postPartnershipRequest({
                    address: data.address,
                    fullName: data.fullName || '',
                    email: data.email || '',
                    phone: data.phone,
                    companyName: data.companyName || '',
                    comment: data.comment,
                    locale,
                })
                break
            case 'pilotApplication':
                isSuccess = await postPilotApplicationRequest({
                    product: data.product || '',
                    fullName: data.fullName || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    companyName: data.companyName || '',
                    comment: data.comment,
                    locale,
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
        </PageSection.Card>
    )
}
