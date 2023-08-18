import { TTranslateFn } from '@/utils/translate'

export const validateRequired = (t: TTranslateFn) => (isRequired?: boolean) =>
    isRequired && t('validation.required')
