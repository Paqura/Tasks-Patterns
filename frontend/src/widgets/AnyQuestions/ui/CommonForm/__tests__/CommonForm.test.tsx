import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TranslationProvider } from '@/services/translation'
// eslint-disable-next-line import/order
import { CommonForm } from '../CommonForm'

const defaultFields = {
    buttonSubmit: 'submit',
    checkboxConsentsTerms: 'consents',
    checkboxSubscription: 'subscription',
    description: '',
    fieldComment: 'comment',
    fieldEmail: 'email',
    fieldName: 'name',
    fieldPhone: '',
    successDescription: '',
    successTitle: '',
    title: '',
    fieldAddress: '',
    fieldCompanyName: '',
    fieldProduct: '',
} as const

describe('<CommonForm />', () => {
    test('called onSubmit after every required field has been filled', async () => {
        const submitHandler = vi.fn()

        render(
            <TranslationProvider>
                <CommonForm
                    type="feedback"
                    feedback={defaultFields}
                    partnership={defaultFields}
                    pilotApplication={defaultFields}
                    isCompleted={false}
                    onSubmit={submitHandler}
                    selectProductOptions={[]}
                    selectedProduct=""
                />
            </TranslationProvider>,
        )

        const [nameInput, emailInput, commentInput] = [
            defaultFields.fieldName,
            defaultFields.fieldEmail,
            defaultFields.fieldComment,
        ].map((placeholder) => screen.getByPlaceholderText(placeholder))

        const [consents, subscription] = [
            defaultFields.checkboxConsentsTerms,
            defaultFields.checkboxSubscription,
        ].map((placeholder) => screen.getByText(placeholder))

        const buttonSubmit = screen.getByText(defaultFields.buttonSubmit)

        await userEvent.type(nameInput, 'name')
        await userEvent.type(emailInput, 'test@mail.com')
        await userEvent.type(commentInput, 'test comment')

        await userEvent.click(consents)
        await userEvent.click(subscription)

        await userEvent.click(buttonSubmit)

        expect(submitHandler).toHaveBeenCalledWith(
            {
                address: undefined,
                comment: 'test comment',
                companyName: undefined,
                consentsTerms: true,
                subscription: true,
                email: 'test@mail.com',
                fullName: 'name',
                phone: undefined,
                product: '',
            },

            // form event
            expect.anything(),
        )
    })
})
