import { TFormFields } from '../ui/Form'
import { postFeedbackRequest } from '@/utils/siteApi'
import { useLocale } from '@/utils/translate'

type TUseSendFeedback = {
    onSuccess: VoidFunction
}

export const useSendFeedback = ({ onSuccess }: TUseSendFeedback) => {
    const locale = useLocale()

    const handleFeedbackSend = async (data: TFormFields) => {
        const isSuccess = await postFeedbackRequest({
            fullName: data.fullName || '',
            email: data.email || '',
            phone: data.phone || '',
            comment: data.comment || '',
            locale,
        })

        if (isSuccess) {
            onSuccess()
        }
    }

    return {
        handleFeedbackSend,
    }
}
