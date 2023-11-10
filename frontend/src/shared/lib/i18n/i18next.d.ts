/* eslint-disable @typescript-eslint/naming-convention */
import { defaultNS, TLocale, TLocaleResource } from '.'

declare module 'i18next' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS
        resources: TLocaleResource
        lng: TLocale
    }
}
