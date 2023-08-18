import { ValidationValueMessage } from 'react-hook-form'

import { TTranslateFn } from '@/utils/translate'

export const validateEmail = (t: TTranslateFn): ValidationValueMessage<RegExp> => ({
    message: t('validation.email'),
    // eslint-disable-next-line no-useless-escape
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/g,
})
