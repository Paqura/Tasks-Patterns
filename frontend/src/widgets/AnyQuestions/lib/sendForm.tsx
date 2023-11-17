import { useState } from 'react'

import { useLocale } from '@/services/translation'
import { scrollToSection } from '@/shared/lib/scrollToSection'
import {
    postFeedbackRequest,
    postPartnershipRequest,
    postPilotApplicationRequest,
} from '@/shared/lib/siteApi'
import { TFeedbackFormOutput } from '@/widgets/AnyQuestions/ui/FeedbackForm'
import { TPartnershipFormOutput } from '@/widgets/AnyQuestions/ui/PartnershipForm'
import { TPilotAppFormOutput } from '@/widgets/AnyQuestions/ui/PilotAppForm'

type THandleSubmit = {
    sectionId: string
    recipientEmail: string | undefined
}

export const useHandleFormSend = ({ sectionId, recipientEmail }: THandleSubmit) => {
    const locale = useLocale()
    const [isCompleted, setIsCompleted] = useState(false)

    const onSuccess = () => {
        setIsCompleted(true)
        scrollToSection(sectionId)
    }

    const handleFeedbackSubmit = async (data: TFeedbackFormOutput) => {
        const isSuccess = await postFeedbackRequest({
            fullName: data.fullName || '',
            email: data.email || '',
            phone: data.phone || '',
            comment: data.comment || '',
            locale,
            recipientEmail,
        })

        if (isSuccess) {
            onSuccess()
        }
    }

    const handlePilotAppSubmit = async (data: TPilotAppFormOutput) => {
        const isSuccess = await postPilotApplicationRequest({
            product: data.product || '',
            fullName: data.fullName || '',
            email: data.email || '',
            phone: data.phone || '',
            companyName: data.companyName || '',
            comment: data.comment,
            locale,
            recipientEmail,
        })

        if (isSuccess) {
            onSuccess()
        }
    }

    const handlePartnershipSubmit = async (data: TPartnershipFormOutput) => {
        const isSuccess = await await postPartnershipRequest({
            address: data.address,
            fullName: data.fullName || '',
            email: data.email || '',
            phone: data.phone,
            companyName: data.companyName || '',
            comment: data.comment,
            locale,
            recipientEmail,
        })

        if (isSuccess) {
            onSuccess()
        }
    }

    return {
        isCompleted,
        handlePartnershipSubmit,
        handlePilotAppSubmit,
        handleFeedbackSubmit,
    }
}
