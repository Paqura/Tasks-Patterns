import React, { useState } from 'react'

import { CardsSlider } from '@/components/ui/CardsSlider'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import { CardRadio } from './components/CardRadio'
import {
    CommonForm,
    TCommonFormData,
    TTypeForm,
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
    sectionId,
    selectedProduct,
    anyQuestionData,
}) => {
    const { title, description, feedback, partnership, pilotApplication, selectProductOptions } =
        anyQuestionData
    const [tab, setTab] = useState<TTypeForm>('feedback')

    return (
        <PageSectionCard mode="light" sectionId={sectionId} className={styles.container}>
            <div className={styles.heading}>
                <Heading className={styles.title} level={1}>
                    {title}
                </Heading>
                <Text type={'pL'}>{description}</Text>
            </div>
            <div className={styles.content}>
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
                        onChange={() => setTab('feedback')}
                    />
                    <CardRadio
                        title={partnership.title}
                        description={partnership.description}
                        value={'partnership'}
                        checked={tab === 'partnership'}
                        onChange={() => setTab('partnership')}
                    />
                    <CardRadio
                        title={pilotApplication.title}
                        description={pilotApplication.description}
                        value={'pilotApplication'}
                        checked={tab === 'pilotApplication'}
                        onChange={() => setTab('pilotApplication')}
                    />
                </CardsSlider>
                <CommonForm
                    type={tab}
                    feedback={feedback}
                    partnership={partnership}
                    pilotApplication={pilotApplication}
                    selectProductOptions={selectProductOptions}
                    selectedProduct={selectedProduct}
                />
            </div>
        </PageSectionCard>
    )
}
