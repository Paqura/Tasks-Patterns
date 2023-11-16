import { useLocale } from '@/services/translation'
import { postFeedbackRequest } from '@/shared/lib/siteApi'
import { TFormFields } from '@/widgets/AnyQuestions/ui/CommonForm'

type TUseSendFeedback = {
    recipientEmail: string | undefined
    onSuccess: VoidFunction
}

export const useSendFeedback = ({ onSuccess, recipientEmail }: TUseSendFeedback) => {
    const locale = useLocale()

    const handleFeedbackSend = async (data: TFormFields) => {
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

    return {
        handleFeedbackSend,
    }
}
