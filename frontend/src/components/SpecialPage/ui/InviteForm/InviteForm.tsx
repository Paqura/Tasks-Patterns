import cn from 'classnames'
import { useRouter } from 'next/router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { InputCheckbox } from '@/components/ui/InputCheckbox'
import { Textarea } from '@/components/ui/Textarea'

import styles from './index.module.scss'
import { TInviteFormData, TInviteFormFields } from './lib/types'

type TInviteFormProps = {
    data: TInviteFormData
    onSubmit: (output: TInviteFormFields) => void
}

export const InviteForm = ({ onSubmit, data }: TInviteFormProps) => {
    const { query } = useRouter()

    const context = useForm<TInviteFormFields>({
        shouldFocusError: false,

        defaultValues: {
            recipientEmail: data.recipientEmail,
            emailTemplateName: data.emailTemplateName,
            slug: query.slug as string,
        },
    })

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
                            required={data.companyRequired}
                            placeholder={data.companyPlaceholder}
                            maxLength={250}
                        />
                    </div>

                    <div className={styles.field}>
                        <Input
                            type="text"
                            name={'fullName'}
                            autoComplete={'name'}
                            required={data.nameRequired}
                            placeholder={data.namePlaceholder}
                            maxLength={250}
                        />
                    </div>

                    <div className={styles.field}>
                        <Input
                            type="email"
                            name={'email'}
                            autoComplete={'email'}
                            placeholder={data.emailPlaceholder}
                            required={data.emailRequired}
                            maxLength={250}
                        />
                    </div>

                    <div className={cn(styles.field, styles.fullWidth)}>
                        <Textarea
                            name={'message'}
                            required={data.messageRequired}
                            placeholder={data.messagePlaceholder}
                            maxLength={1000}
                        />
                    </div>

                    <div className={styles.agrees}>
                        <InputCheckbox
                            name={'consentsTerms'}
                            required
                            title={data.checkboxConsentsTerms}
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
                    {data.submitButtonText}
                </Button>
            </form>
        </FormProvider>
    )
}
