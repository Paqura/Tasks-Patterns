import { ValidationValueMessage } from 'react-hook-form'

export const validateEmail: ValidationValueMessage<RegExp> = {
    message: 'name@example.com',
    // eslint-disable-next-line no-useless-escape
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
}
