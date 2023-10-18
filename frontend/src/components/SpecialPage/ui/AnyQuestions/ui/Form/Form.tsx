import cn from 'classnames'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import FormSuccess from '@/components/ui/FormSuccess'
import { Input } from '@/components/ui/Input'
import { InputCheckbox } from '@/components/ui/InputCheckbox'
import { Textarea } from '@/components/ui/Textarea'

import styles from './index.module.scss'
import { MAX_LENGTH } from './lib/restrictions'
import { TFormData, TFormFields } from './lib/types'

type TFormProps = {
    data: TFormData
    onSubmit: (output: TFormFields) => void
    isCompleted: boolean
}

export const Form = ({ data, onSubmit, isCompleted }: TFormProps) => {
    const context = useForm({
        shouldFocusError: false,
    })

    if (isCompleted) {
        return <FormSuccess title={data.successTitle} description={data.successDescription} />
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
                            placeholder={data.fieldName}
                            maxLength={MAX_LENGTH.fullName}
                        />
                    </div>

                    <div className={styles.field}>
                        <Input
                            type="tel"
                            name={'phone'}
                            autoComplete={'tel'}
                            placeholder={data.fieldPhone}
                            maxLength={MAX_LENGTH.phone}
                        />
                    </div>

                    <div className={styles.field}>
                        <Input
                            type="email"
                            name={'email'}
                            autoComplete={'email'}
                            required
                            placeholder={data.fieldEmail}
                            maxLength={MAX_LENGTH.email}
                        />
                    </div>

                    <div className={cn(styles.field, styles.fullWidth)}>
                        <Textarea
                            name={'comment'}
                            required
                            placeholder={data.fieldComment}
                            maxLength={MAX_LENGTH.comment}
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
