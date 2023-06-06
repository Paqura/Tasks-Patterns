import { ValidationValueMessage } from 'react-hook-form'

export const validatePhoneNumber: ValidationValueMessage<RegExp> = {
    message: 'Incorrect phone number format',
    value: /^([\+\-\d\s\(\)]){7,20}$/,
}
