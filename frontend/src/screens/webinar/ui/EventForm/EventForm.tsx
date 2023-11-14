import cn from 'classnames'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useLocale } from '@/services/translation'
import { TEventConfigData } from '@/shared/lib/serverDataMappers/event-article'
import { postWebinarRequest } from '@/shared/lib/siteApi'
import { Button } from '@/shared/ui/common/Button'
import { Input } from '@/shared/ui/common/Input'
import { InputCheckbox } from '@/shared/ui/common/InputCheckbox'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { FormSuccess } from '@/shared/ui/project/FormSuccess'

import styles from './index.module.scss'

export type TEventFormProps = {
    slug: string
    eventConfigData: TEventConfigData
}

type TFormFields = {
    fullName?: string
    email?: string
    phone?: string
    companyName?: string
    companyPosition?: string
}

export const EventForm = (props: TEventFormProps) => {
    const [isCompleted, setIsCompleted] = useState<boolean>(false)
    const context = useForm({
        shouldFocusError: false,
    })
    const locale = useLocale()

    const onSubmit = async (data: TFormFields) => {
        try {
            const isSuccess = await postWebinarRequest({
                slug: props.slug,
                fullName: data.fullName || '',
                email: data.email || '',
                phone: data.phone,
                companyName: data.companyName,
                companyPosition: data.companyPosition,
                locale: locale,
            })

            if (isSuccess) {
                setIsCompleted(true)
            }
        } catch {
            return true
        }
    }

    return (
        <div className={styles.wrapper}>
            {props.eventConfigData.title && (
                <Heading level={2} className={styles.title}>
                    {props.eventConfigData.title}
                </Heading>
            )}
            {isCompleted && (
                <FormSuccess
                    title={props.eventConfigData.successTitle}
                    description={props.eventConfigData.successDescription}
                />
            )}
            {isCompleted || (
                <FormProvider {...context}>
                    <form onSubmit={context.handleSubmit(onSubmit)}>
                        <div className={styles.fields}>
                            <div className={cn(styles.field, styles.name)}>
                                <Input
                                    type="text"
                                    name={'fullName'}
                                    autoComplete={'name'}
                                    required
                                    maxLength={250}
                                    placeholder={props.eventConfigData.name}
                                />
                            </div>
                            <div className={styles.field}>
                                <Input
                                    type="text"
                                    name={'companyName'}
                                    autoComplete={'organization'}
                                    maxLength={250}
                                    placeholder={props.eventConfigData.company}
                                />
                            </div>
                            <div className={styles.field}>
                                <Input
                                    type="text"
                                    name={'companyPosition'}
                                    autoComplete={'organization-title'}
                                    maxLength={250}
                                    placeholder={props.eventConfigData.position}
                                />
                            </div>
                            <div className={styles.field}>
                                <Input
                                    type="tel"
                                    name={'phone'}
                                    autoComplete={'tel'}
                                    maxLength={250}
                                    placeholder={props.eventConfigData.phone}
                                />
                            </div>
                            <div className={styles.field}>
                                <Input
                                    type="email"
                                    name={'email'}
                                    autoComplete={'email'}
                                    required
                                    maxLength={250}
                                    placeholder={props.eventConfigData.email}
                                />
                            </div>
                        </div>
                        <div className={styles.agrees}>
                            <InputCheckbox
                                name={'consentsTerms'}
                                required
                                title={props.eventConfigData.consentsTerms}
                            />
                            <InputCheckbox
                                name={'subscription'}
                                required
                                title={props.eventConfigData.subscription}
                            />
                        </div>
                        <Button
                            size={'m'}
                            type={'submit'}
                            className={styles.submit}
                            disabled={context.formState.isSubmitting}
                            loading={context.formState.isSubmitting}
                        >
                            {props.eventConfigData.submit}
                        </Button>
                    </form>
                </FormProvider>
            )}
        </div>
    )
}
