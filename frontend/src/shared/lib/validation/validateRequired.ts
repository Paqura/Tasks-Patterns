import { TTranslateFn } from '@/shared/lib/translate'

export const validateRequired = (t: TTranslateFn) => (isRequired?: boolean) =>
    isRequired && t('validation.required')
