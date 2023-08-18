import { ValidationValueMessage } from 'react-hook-form'

import { TTranslateFn } from '@/utils/translate'

export const validatePhoneNumber = (t: TTranslateFn): ValidationValueMessage<RegExp> => ({
    message: t('validation.phoneNumber'),
    value: /^([\+\-\d\s\(\)]){7,20}$/,
})
