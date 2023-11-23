import { TTranslateFn } from '@/services/translation'

export const validateRequired = (t: TTranslateFn) => (isRequired?: boolean) =>
    isRequired && t('validation.required')
