import { ValidationValueMessage } from 'react-hook-form'

export const validatePhoneNumber: ValidationValueMessage<RegExp> = {
    message: 'Incorrect phone number format',
    value: /^(\+7 \(\d{3}\) (\d){3}-(\d{2})-(\d{2}))$/,
}
