import cn from 'classnames'
import React, { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import FormSuccess from '@/components/ui/FormSuccess'
import { Input } from '@/components/ui/Input'
import { InputCheckbox } from '@/components/ui/InputCheckbox'
import { Select, TSelectOption } from '@/components/ui/Select'
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
    type: TTypeForm
    feedback: TCommonFormData
    partnership: TCommonFormData
    pilotApplication: TCommonFormData
    selectProductOptions: TSelectProductOptions
    selectedProduct?: string
    onSubmit: (data: TFormFields) => void
    isCompleted: boolean
}

export const CommonForm: React.FC<TCommonFormProps> = ({
    type,
    feedback,
    partnership,
    pilotApplication,
    selectProductOptions,
    selectedProduct,
    onSubmit,
    isCompleted,
}) => {
    const context = useForm({
        shouldFocusError: false,
        defaultValues: {
            product: selectedProduct,
        },
    })

    const labels = useMemo(() => {
        switch (type) {
            case 'feedback':
                return feedback
            case 'partnership':
                return partnership
            case 'pilotApplication':
                return pilotApplication
        }
    }, [feedback, partnership, pilotApplication, type])

    if (isCompleted) {
        return <FormSuccess title={labels.successTitle} description={labels.successTitle} />
    }

    return (
        <FormProvider {...context}>
            <form onSubmit={context.handleSubmit(onSubmit)}>
                <div className={styles.fields}>
                    <div
                        className={cn(styles.field, styles.fullWidth, {
                            [styles.hidden]: type !== 'pilotApplication',
                        })}
                    >
                        <Select
                            name={'product'}
                            options={selectProductOptions}
                            required={type === 'pilotApplication'}
                            placeholder={labels.fieldProduct}
                        />
                    </div>
                    <div
                        className={cn(styles.field, {
                            [styles.fullWidth]: type === 'feedback',
                        })}
                    >
                        <Input
                            type="text"
                            name={'fullName'}
                            autoComplete={'name'}
                            required
                            placeholder={labels.fieldName}
                            maxLength={250}
                        />
                    </div>
                    <div className={cn(styles.field, { [styles.hidden]: type === 'feedback' })}>
                        <Input
                            type="text"
                            name={'companyName'}
                            autoComplete={'organization'}
                            required={type !== 'feedback'}
                            placeholder={labels.fieldCompanyName}
                            maxLength={250}
                        />
                    </div>
                    <div className={styles.field}>
                        <Input
                            type="tel"
                            name={'phone'}
                            autoComplete={'tel'}
                            placeholder={labels.fieldPhone}
                            maxLength={20}
                        />
                    </div>
                    <div className={styles.field}>
                        <Input
                            type="email"
                            name={'email'}
                            autoComplete={'email'}
                            required
                            placeholder={labels.fieldEmail}
                            maxLength={250}
                        />
                    </div>
                    <div
                        className={cn(styles.field, styles.fullWidth, {
                            [styles.hidden]: type !== 'partnership',
                        })}
                    >
                        <Input
                            type="text"
                            name={'address'}
                            autoComplete={'url'}
                            placeholder={labels.fieldAddress}
                            maxLength={250}
                        />
                    </div>
                    <div className={cn(styles.field, styles.fullWidth)}>
                        <Textarea
                            name={'comment'}
                            required={type === 'feedback'}
                            placeholder={labels.fieldComment}
                            maxLength={1000}
                        />
                    </div>
                </div>
                <div className={styles.agrees}>
                    <InputCheckbox
                        name={'consentsTerms'}
                        required
                        title={labels.checkboxConsentsTerms}
                    />
                    <InputCheckbox
                        name={'subscription'}
                        required
                        title={labels.checkboxSubscription}
                    />
                </div>
                <Button
                    size={'m'}
                    type={'submit'}
                    className={styles.submit}
                    disabled={context.formState.isSubmitting}
                    loading={context.formState.isSubmitting}
                >
                    {labels.buttonSubmit}
                </Button>
            </form>
        </FormProvider>
    )
}
