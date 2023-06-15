import { ValidationValueMessage } from 'react-hook-form'

export const validatePhoneNumber: ValidationValueMessage<RegExp> = {
    message: 'Only digits and spaces',
    value: /^([\+\-\d\s\(\)]){7,20}$/,
}
