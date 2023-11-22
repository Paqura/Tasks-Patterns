import cn from 'classnames'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/common/Button'
import { Input } from '@/shared/ui/common/Input'
import { InputCheckbox } from '@/shared/ui/common/InputCheckbox'
import { Select, TSelectOption } from '@/shared/ui/common/Select'
import { Textarea } from '@/shared/ui/common/Textarea'

import styles from './index.module.scss'

export type TPilotAppFormData = {
    title: string
    description: string
    fieldProduct: string
    fieldCompanyName?: string
    fieldName: string
    fieldPhone: string
    fieldEmail: string
    fieldComment: string
    checkboxConsentsTerms: string
    checkboxSubscription: string
    buttonSubmit: string
    successTitle: string
    successDescription: string
}

export type TPilotAppFormFields = {
    fullName: string
    phone: string
    email: string
    comment: string
    companyName: string
    product: string
    subscription: boolean
    consentsTerms: boolean
}

export type TSelectProductOptions = TSelectOption<string>[]

export type TPilotAppFormOutput = TPilotAppFormFields

type TPilotAppFormProps = {
    data: TPilotAppFormData
    selectedProduct: string | undefined
    selectProductOptions: TSelectProductOptions
    onSubmit: (output: TPilotAppFormOutput) => Promise<void>
}

export const PilotAppForm = ({
    data,
    onSubmit,
    selectProductOptions = [],
    selectedProduct = '',
}: TPilotAppFormProps) => {
    const context = useForm<TPilotAppFormFields>({
        shouldFocusError: false,
        defaultValues: {
            fullName: '',
            phone: '',
            email: '',
            product: selectedProduct,
            comment: '',
            companyName: '',
            consentsTerms: false,
            subscription: false,
        },
    })

    const handleSubmit = async (data: TPilotAppFormOutput) => {
        await onSubmit(data)
        context.reset()
    }

    return (
        <FormProvider {...context}>
            <form onSubmit={context.handleSubmit(handleSubmit)}>
                <div className={styles.fields}>
                    <div className={cn(styles.field, styles.fullWidth)}>
                        <Select
                            dataTestIds={{
                                toggle: 'product-toggle',
                            }}
                            name={'product'}
                            options={selectProductOptions}
                            required
                            placeholder={data.fieldProduct}
                        />
                    </div>

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
