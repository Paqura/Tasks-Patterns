export type TInviteFormData = {
    companyPlaceholder: string
    namePlaceholder: string
    emailPlaceholder: string
    messagePlaceholder: string
    companyRequired: boolean
    messageRequired: boolean
    nameRequired: boolean
    emailRequired: boolean
    submitButtonText: string
    checkboxConsentsTerms: string

    successMessageTitle: string
    successMessageDescription: string

    recipientEmail: string
    emailTemplateName: string
}

export type TInviteFormFields = {
    company: string
    fullName: string
    email: string
    message: string
    recipientEmail: string
    emailTemplateName: string
    slug: string
}
