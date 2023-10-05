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

export type TInviteFormData = {
    companyPlaceholder: string
    namePlaceholder: string
    emailPlaceholder: string
    messagePlaceholder: string
    companyRequired: boolean
    messageRequired: boolean
    nameRequired: boolean
    emailRequired: boolean
    submitButtonText: string

    successMessageTitle: string
    successMessageDescription: string

    checkboxConsentsTerms: string
}

export type TSelectProductOptions = TSelectOption<string>[]

export type TTypeForm = 'feedback' | 'partnership' | 'pilotApplication'

export type TGitexInviteFormFields = {
    company: string
    fullName: string
    email: string
    message: string
}

type TInviteFormProps = {
    formData: TInviteFormData
    onSubmit: (data: TGitexInviteFormFields) => void
    isCompleted: boolean
}

export const InviteForm = ({ isCompleted, onSubmit, formData }: TInviteFormProps) => {
    const context = useForm<TGitexInviteFormFields>({
        shouldFocusError: false,
    })

    if (isCompleted) {
        return (
            <FormSuccess
                title={formData.successMessageTitle}
                description={formData.successMessageDescription}
            />
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
                            name={'company'}
                            required={formData.companyRequired}
                            placeholder={formData.companyPlaceholder}
                            maxLength={250}
                        />
                    </div>

                    <div className={styles.field}>
                        <Input
                            type="text"
                            name={'fullName'}
                            autoComplete={'name'}
                            required={formData.nameRequired}
                            placeholder={formData.namePlaceholder}
                            maxLength={250}
                        />
                    </div>

                    <div className={styles.field}>
                        <Input
                            type="email"
                            name={'email'}
                            autoComplete={'email'}
                            placeholder={formData.emailPlaceholder}
                            required={formData.emailRequired}
                            maxLength={250}
                        />
                    </div>

                    <div className={cn(styles.field, styles.fullWidth)}>
                        <Textarea
                            name={'message'}
                            required={formData.messageRequired}
                            placeholder={formData.messagePlaceholder}
                            maxLength={1000}
                        />
                    </div>

                    <div className={styles.agrees}>
                        <InputCheckbox
                            name={'consentsTerms'}
                            required
                            title={formData.checkboxConsentsTerms}
                        />
                    </div>
                </div>

                <Button
                    size={'m'}
                    type={'submit'}
                    className={styles.submit}
                    disabled={context.formState.isSubmitting}
                    loading={context.formState.isSubmitting}
                >
                    {formData.submitButtonText}
                </Button>
            </form>
        </FormProvider>
    )
}
