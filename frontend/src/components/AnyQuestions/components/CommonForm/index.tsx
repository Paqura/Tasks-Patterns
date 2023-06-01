import cn from 'classnames'
import React, { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import FormSuccess from '@/components/ui/FormSuccess'
import { Input } from '@/components/ui/Input'
import { InputCheckbox } from '@/components/ui/InputCheckbox'
import { Select, TSelectOption } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import {
    postFeedbackRequest,
    postPartnershipRequest,
    postPilotApplicationRequest,
} from '@/utils/siteApi'

import styles from './index.module.scss'

export type TCommonFormData = {
    title: string
    description: string
    fieldName: string
    fieldPhone: string
    fieldEmail: string
    fieldProduct?: string
    fieldCompanyName?: string
    checkboxConsentsTerms: string
    checkboxSubscription: string
    buttonSubmit: string
    successTitle: string
    successDescription: string
    fieldComment: string
}

export type TSelectProductOptions = TSelectOption<string>[]

export type TTypeForm = 'feedback' | 'partnership' | 'pilotApplication'

type TCommonFormProps = {
    type: TTypeForm
    feedback: TCommonFormData
    partnership: TCommonFormData
    pilotApplication: TCommonFormData
    selectProductOptions: TSelectProductOptions
    selectedProduct?: string
}

type TFormFields = {
    product?: string
    fullName?: string
    email?: string
    phone?: string
    companyName?: string
    comment?: string
}

export const CommonForm: React.FC<TCommonFormProps> = ({
    type,
    feedback,
    partnership,
    pilotApplication,
    selectProductOptions,
    selectedProduct,
}) => {
    const [isCompleted, setIsCompleted] = useState<boolean>(false)
    const context = useForm({
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

    useEffect(() => {
        setIsCompleted(false)
    }, [type, setIsCompleted])

    const onSubmit = async (data: TFormFields) => {
        let isSuccess = false
        switch (type) {
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
        }
    }

    if (isCompleted) {
        return <FormSuccess title={labels.successTitle} description={labels.successTitle} />
    }

    return (
        <FormProvider {...context}>
            <form onSubmit={context.handleSubmit(onSubmit)}>
                <div className={styles.fields}>
                    {type === 'pilotApplication' && (
                        <div className={cn(styles.field, styles.fullWidth)}>
                            <Select
                                name={'product'}
                                options={selectProductOptions}
                                required
                                placeholder={labels.fieldProduct}
                            />
                        </div>
                    )}
                    <div
                        className={cn(styles.field, {
                            [styles.fullWidth]: type === 'feedback',
                        })}
                    >
                        <Input
                            type="text"
                            name={'fullName'}
                            required
                            placeholder={labels.fieldName}
                        />
                    </div>
                    {type !== 'feedback' && (
                        <div className={styles.field}>
                            <Input
                                type="text"
                                name={'companyName'}
                                required
                                placeholder={labels.fieldCompanyName}
                            />
                        </div>
                    )}
                    <div className={styles.field}>
                        <Input type="tel" name={'phone'} placeholder={labels.fieldPhone} />
                    </div>
                    <div className={styles.field}>
                        <Input
                            type="email"
                            name={'email'}
                            required
                            placeholder={labels.fieldEmail}
                        />
                    </div>
                    <div className={cn(styles.field, styles.fullWidth)}>
                        <Textarea name={'comment'} required placeholder={labels.fieldComment} />
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
                <Button size={'m'} type={'submit'} className={styles.submit}>
                    {labels.buttonSubmit}
                </Button>
            </form>
        </FormProvider>
    )
}
