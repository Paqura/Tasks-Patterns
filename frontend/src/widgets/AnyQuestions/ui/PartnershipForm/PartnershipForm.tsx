import cn from 'classnames'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/common/Button'
import { Input } from '@/shared/ui/common/Input'
import { InputCheckbox } from '@/shared/ui/common/InputCheckbox'
import { Textarea } from '@/shared/ui/common/Textarea'

import styles from './index.module.scss'

export type TPartnershipFormData = {
    title: string
    description: string
    fieldName: string
    fieldCompanyName: string
    fieldPhone: string
    fieldEmail: string
    fieldAddress: string
    fieldComment: string
    checkboxConsentsTerms: string
    checkboxSubscription: string
    buttonSubmit: string
    successTitle: string
    successDescription: string
}

export type TPartnershipFormFields = {
    fullName: string
    phone: string
    email: string
    comment: string
    address: string
    companyName: string
    subscription: boolean
    consentsTerms: boolean
}

export type TPartnershipFormOutput = TPartnershipFormFields

type TPartnershipFormProps = {
    data: TPartnershipFormData
    onSubmit: (output: TPartnershipFormOutput) => void
}

export const PartnershipForm = ({ data, onSubmit }: TPartnershipFormProps) => {
    const context = useForm<TPartnershipFormFields>({
        shouldFocusError: false,
        defaultValues: {
            fullName: '',
            phone: '',
            email: '',
            comment: '',
            companyName: '',
            consentsTerms: false,
            subscription: false,
        },
    })

    const handleSubmit = async (data: TPartnershipFormOutput) => {
        await onSubmit(data)
        context.reset()
    }

    return (
        <FormProvider {...context}>
            <form onSubmit={context.handleSubmit(handleSubmit)}>
                <div className={styles.fields}>
                    <div className={cn(styles.field)}>
                        <Input
                            type="text"
                            name={'fullName'}
                            autoComplete={'name'}
                            required
                            placeholder={data.fieldName}
                            maxLength={250}
                        />
                    </div>

                    <div className={cn(styles.field)}>
                        <Input
                            type="text"
                            name={'companyName'}
                            autoComplete={'organization'}
                            required
                            placeholder={data.fieldCompanyName}
                            maxLength={250}
                        />
                    </div>

                    <div className={styles.field}>
                        <Input
                            type="tel"
                            name={'phone'}
                            autoComplete={'tel'}
                            placeholder={data.fieldPhone}
                            maxLength={20}
                        />
                    </div>

                    <div className={styles.field}>
                        <Input
                            type="email"
                            name={'email'}
                            autoComplete={'email'}
                            required
                            placeholder={data.fieldEmail}
                            maxLength={250}
                        />
                    </div>

                    <div className={cn(styles.field, styles.fullWidth)}>
                        <Input
                            type="text"
                            name={'address'}
                            autoComplete={'url'}
                            placeholder={data.fieldAddress}
                            maxLength={250}
                        />
                    </div>

                    <div className={cn(styles.field, styles.fullWidth)}>
                        <Textarea
                            name={'comment'}
                            placeholder={data.fieldComment}
                            maxLength={1000}
                        />
                    </div>
                </div>

                <div className={styles.agrees}>
                    <InputCheckbox
                        name={'consentsTerms'}
                        required
                        title={data.checkboxConsentsTerms}
                    />
                    <InputCheckbox
                        name={'subscription'}
                        required
                        title={data.checkboxSubscription}
                    />
                </div>

                <Button
                    size={'m'}
                    type={'submit'}
                    className={styles.submit}
                    disabled={context.formState.isSubmitting}
                    loading={context.formState.isSubmitting}
                >
                    {data.buttonSubmit}
                </Button>
            </form>
        </FormProvider>
    )
}
