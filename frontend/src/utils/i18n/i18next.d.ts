/* eslint-disable @typescript-eslint/naming-convention */
import { defaultNS, TLocale, TLocaleResource } from '.'

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS
        resources: TLocaleResource
        lng: TLocale
    }
}
