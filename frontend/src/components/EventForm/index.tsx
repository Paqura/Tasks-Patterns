import cn from 'classnames'
import DOMPurify from 'isomorphic-dompurify'
import { marked } from 'marked'
import React from 'react'
import { useForm } from 'react-hook-form'

import styles from './index.module.scss'

import { Button } from 'src/components/ui/Button'
import { Heading } from 'src/components/ui/typography/Heading'
import { TEventFormData } from 'src/utils/serverDataMappers/event-article'
import { postWebinarRequest } from 'src/utils/siteApi'

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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data: TFormFields) => {
        const isSuccess = await postWebinarRequest({
            slug: props.eventFormData.slug,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            companyName: data.companyName,
            companyPosition: data.companyPosition,
        })

        alert(isSuccess ? 'A confirmation email has been sent to your email' : 'Error')
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {props.eventFormData.title && (
                <Heading level={2} className={styles.title}>
                    {props.eventFormData.title}
                </Heading>
            )}
            <div className={styles.fields}>
                <div className={cn(styles.field, styles.name)}>
                    <input
                        className={cn({
                            [styles.error]: errors?.fullName ?? false,
                        })}
                        type={'text'}
                        placeholder={props.eventFormData.name}
                        {...register('fullName', { required: true })}
                    />
                </div>
                <div className={styles.field}>
                    <input
                        type={'text'}
                        placeholder={props.eventFormData.company}
                        {...register('companyName')}
                    />
                </div>
                <div className={styles.field}>
                    <input
                        type={'text'}
                        placeholder={props.eventFormData.position}
                        {...register('companyPosition')}
                    />
                </div>
                <div className={styles.field}>
                    <input
                        type={'tel'}
                        className={cn({
                            [styles.error]: errors?.phone ?? false,
                        })}
                        placeholder={props.eventFormData.phone}
                        {...register('phone', {
                            pattern: {
                                value: /^\+?[1-9][0-9]{7,19}$/,
                                message: '+99-999-999-99-99',
                            },
                        })}
                    />
                </div>
                <div className={styles.field}>
                    <input
                        className={cn({
                            [styles.error]: errors?.email ?? false,
                        })}
                        type={'email'}
                        placeholder={props.eventFormData.email}
                        {...register('email', {
                            required: true,
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: 'Only latin characters, numbers, - _ are allowed',
                            },
                        })}
                    />
                </div>
            </div>
            <div className={styles.agrees}>
                <label
                    className={cn(styles.checkbox, {
                        [styles.error]: errors?.consentsTerms ?? false,
                    })}
                >
                    <input type={'checkbox'} {...register('consentsTerms', { required: true })} />
                    <span
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                                marked.parse(props.eventFormData.consentsTerms)
                            ),
                        }}
                    />
                </label>
                <label
                    className={cn(styles.checkbox, {
                        [styles.error]: errors?.subscription ?? false,
                    })}
                >
                    <input
                        type={'checkbox'}
                        {...register('subscription', { required: 'required' })}
                    />
                    <span
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                                marked.parse(props.eventFormData.subscription)
                            ),
                        }}
                    />
                </label>
            </div>
            <Button size={'m'} type={'submit'} className={styles.submit}>
                {props.eventFormData.submit}
            </Button>
        </form>
    )
}
