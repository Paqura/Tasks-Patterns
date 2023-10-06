import cn from 'classnames'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import FormSuccess from '@/components/ui/FormSuccess'
import { Input } from '@/components/ui/Input'
import { InputCheckbox } from '@/components/ui/InputCheckbox'
import { TSelectOption } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'

import styles from './index.module.scss'

export type TCommonFormData = {
    title: string
    description: string
    fieldName: string
    fieldPhone: string
    fieldEmail: string
    fieldProduct?: string
    fieldCompanyName?: string
    fieldAddress?: string
    checkboxConsentsTerms: string
    checkboxSubscription: string
    buttonSubmit: string
    successTitle: string
    successDescription: string
    fieldComment: string
}

export type TSelectProductOptions = TSelectOption<string>[]

export type TTypeForm = 'feedback' | 'partnership' | 'pilotApplication'

export type TFormFields = {
    product?: string
    fullName?: string
    email?: string
    phone?: string
    companyName?: string
    address?: string
    comment?: string
}

type TCommonFormProps = {
    feedback: TCommonFormData
    selectedProduct?: string
    onSubmit: (data: TFormFields) => void
    isCompleted: boolean
}

export const CommonForm: React.FC<TCommonFormProps> = ({ feedback, onSubmit, isCompleted }) => {
    const context = useForm({
        shouldFocusError: false,
    })

    if (isCompleted) {
        return (
            <FormSuccess title={feedback.successTitle} description={feedback.successDescription} />
        )
    }

    return (
        <FormProvider {...context}>
            <form onSubmit={context.handleSubmit(onSubmit)}>
                <div className={styles.fields}>
                    <div
                        className={cn(styles.field, {
                            [styles.fullWidth]: true,
                        })}
                    >
                        <Input
                            type="text"
                            name={'fullName'}
                            autoComplete={'name'}
                            required
                            placeholder={feedback.fieldName}
                            maxLength={250}
                        />
                    </div>

                    <div className={styles.field}>
                        <Input
                            type="tel"
                            name={'phone'}
                            autoComplete={'tel'}
                            placeholder={feedback.fieldPhone}
                            maxLength={20}
                        />
                    </div>
                    <div className={styles.field}>
                        <Input
                            type="email"
                            name={'email'}
                            autoComplete={'email'}
                            required
                            placeholder={feedback.fieldEmail}
                            maxLength={250}
                        />
                    </div>
                    <div className={cn(styles.field, styles.fullWidth)}>
                        <Textarea
                            name={'comment'}
                            required
                            placeholder={feedback.fieldComment}
                            maxLength={1000}
                        />
                    </div>
                </div>
                <div className={styles.agrees}>
                    <InputCheckbox
                        name={'consentsTerms'}
                        required
                        title={feedback.checkboxConsentsTerms}
                    />
                    <InputCheckbox
                        name={'subscription'}
                        required
                        title={feedback.checkboxSubscription}
                    />
                </div>
                <Button
                    size={'m'}
                    type={'submit'}
                    className={styles.submit}
                    disabled={context.formState.isSubmitting}
                    loading={context.formState.isSubmitting}
                >
                    {feedback.buttonSubmit}
                </Button>
            </form>
        </FormProvider>
    )
}
