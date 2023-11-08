import { TFormFields } from './types'

export const MAX_LENGTH: Record<keyof TFormFields, number> = {
    fullName: 250,
    phone: 20,
    email: 250,
    comment: 1000,
}
