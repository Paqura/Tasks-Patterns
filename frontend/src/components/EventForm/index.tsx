import cn from 'classnames'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import FormSuccess from '@/components/ui/FormSuccess'
import Input from '@/components/ui/Input'
import { InputCheckbox } from '@/components/ui/InputCheckbox'
import { Heading } from '@/components/ui/typography/Heading'
import { TEventFormData } from '@/utils/serverDataMappers/event-article'
import { postWebinarRequest } from '@/utils/siteApi'

import styles from './index.module.scss'

export type TEventForm = {
    eventFormData: TEventFormData
}

type TFormFields = {
    fullName?: string
    email?: string
    phone?: string
    companyName?: string
    companyPosition?: string
}

export default function EventForm(props: TEventForm) {
    const [isCompleted, setIsCompleted] = useState<boolean>(false)
    const context = useForm()

    const onSubmit = async (data: TFormFields) => {
        const isSuccess = await postWebinarRequest({
            slug: props.eventFormData.slug,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            companyName: data.companyName,
            companyPosition: data.companyPosition,
        })

        if (isSuccess) {
            setIsCompleted(true)
        }
    }

    return (
        <div className={styles.wrapper}>
            {props.eventFormData.title && (
                <Heading level={2} className={styles.title}>
                    {props.eventFormData.title}
                </Heading>
            )}
            {isCompleted && (
                <FormSuccess
                    title={props.eventFormData.successTitle}
                    description={props.eventFormData.successTitle}
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
                                    required
                                    placeholder={props.eventFormData.name}
                                />
                            </div>
                            <div className={styles.field}>
                                <Input
                                    type="text"
                                    name={'companyName'}
                                    required
                                    placeholder={props.eventFormData.company}
                                />
                            </div>
                            <div className={styles.field}>
                                <Input
                                    type="text"
                                    name={'companyPosition'}
                                    required
                                    placeholder={props.eventFormData.position}
                                />
                            </div>
                            <div className={styles.field}>
                                <Input
                                    type="tel"
                                    name={'phone'}
                                    required
                                    placeholder={props.eventFormData.phone}
                                />
                            </div>
                            <div className={styles.field}>
                                <Input
                                    type="email"
                                    name={'email'}
                                    required
                                    placeholder={props.eventFormData.email}
                                />
                            </div>
                        </div>
                        <div className={styles.agrees}>
                            <InputCheckbox
                                name={'consentsTerms'}
                                required
                                title={props.eventFormData.consentsTerms}
                            />
                            <InputCheckbox
                                name={'subscription'}
                                required
                                title={props.eventFormData.consentsTerms}
                            />
                        </div>
                        <Button size={'m'} type={'submit'} className={styles.submit}>
                            {props.eventFormData.submit}
                        </Button>
                    </form>
                </FormProvider>
            )}
        </div>
    )
}