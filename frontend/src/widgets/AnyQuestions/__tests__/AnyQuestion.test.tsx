import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TranslationProvider } from '@/services/translation'
// eslint-disable-next-line import/order
import { AnyQuestions, TTypeForm } from '../AnyQuestions'

const defaultFields = {
    buttonSubmit: 'submit',
    checkboxConsentsTerms: 'consents',
    checkboxSubscription: 'subscription',
    description: '',
    fieldComment: 'comment',
    fieldEmail: 'email',
    fieldName: 'name',
    fieldPhone: 'phone',
    successDescription: '',
    successTitle: '',
    title: '',
    fieldAddress: 'address',
    fieldCompanyName: 'companyName',
    fieldProduct: 'product',
} as const

const selectTab = async (screen: ReturnType<typeof render>, tab: TTypeForm) =>
    await userEvent.click(screen.getByTestId(`form-tab-${tab}`))

const renderForm = () => {
    const feedbackSubmitHandler = vi.fn()
    const partnershipSubmitHandler = vi.fn()
    const pilotAppSubmitHandler = vi.fn()

    const selectProductOptions = [
        {
            label: 'Product1',
            value: 'product1',
        },
        {
            label: 'Product2',
            value: 'product2',
        },
    ]

    const screen = render(
        <TranslationProvider>
            <AnyQuestions
                useFormSend={() => {
                    return {
                        handleFeedbackSubmit: feedbackSubmitHandler,
                        handlePartnershipSubmit: partnershipSubmitHandler,
                        handlePilotAppSubmit: pilotAppSubmitHandler,
                        isCompleted: false,
                    }
                }}
                anyQuestionData={{
                    title: 'Title',
                    description: 'Description',
                    feedback: defaultFields,
                    partnership: defaultFields,
                    pilotApplication: defaultFields,
                    recipientEmail: 'test@mail.com',
                    selectProductOptions,
                }}
            />
        </TranslationProvider>,
    )

    return {
        screen,
        selectProductOptions,

        feedbackSubmitHandler,
        partnershipSubmitHandler,
        pilotAppSubmitHandler,
    }
}

describe('<AnyQuestions />', () => {
    test('Feedback form called onSubmit after every required field has been filled', async () => {
        const { feedbackSubmitHandler, screen } = renderForm()

        await selectTab(screen, 'feedback')

        const [nameInput, emailInput, commentInput, phoneInput] = [
            defaultFields.fieldName,
            defaultFields.fieldEmail,
            defaultFields.fieldComment,
            defaultFields.fieldPhone,
        ].map((placeholder) => screen.getByPlaceholderText(placeholder))

        const [consents, subscription] = [
            defaultFields.checkboxConsentsTerms,
            defaultFields.checkboxSubscription,
        ].map((placeholder) => screen.getByText(placeholder))

        const buttonSubmit = screen.getByText(defaultFields.buttonSubmit)

        await userEvent.type(nameInput, 'name')
        await userEvent.type(emailInput, 'test@mail.com')
        await userEvent.type(commentInput, 'test comment')
        await userEvent.type(phoneInput, '123456789')

        await userEvent.click(consents)
        await userEvent.click(subscription)

        await userEvent.click(buttonSubmit)

        expect(feedbackSubmitHandler).toHaveBeenCalledWith({
            comment: 'test comment',
            consentsTerms: true,
            subscription: true,
            email: 'test@mail.com',
            fullName: 'name',
            phone: '123456789',
        })
    })

    test('Partnership form called onSubmit after every required field has been filled', async () => {
        const { partnershipSubmitHandler, screen } = renderForm()

        await selectTab(screen, 'partnership')

        const [nameInput, emailInput, commentInput, phoneInput, companyInput, addressInput] = [
            defaultFields.fieldName,
            defaultFields.fieldEmail,
            defaultFields.fieldComment,
            defaultFields.fieldPhone,
            defaultFields.fieldCompanyName,
            defaultFields.fieldAddress,
        ].map((placeholder) => screen.getByPlaceholderText(placeholder))

        const [consents, subscription] = [
            defaultFields.checkboxConsentsTerms,
            defaultFields.checkboxSubscription,
        ].map((placeholder) => screen.getByText(placeholder))

        const buttonSubmit = screen.getByText(defaultFields.buttonSubmit)

        await userEvent.type(nameInput, 'name')
        await userEvent.type(emailInput, 'test@mail.com')
        await userEvent.type(commentInput, 'test comment')
        await userEvent.type(phoneInput, '123456789')
        await userEvent.type(companyInput, 'company')
        await userEvent.type(addressInput, 'address')

        await userEvent.click(consents)
        await userEvent.click(subscription)

        await userEvent.click(buttonSubmit)

        expect(partnershipSubmitHandler).toHaveBeenCalledWith({
            comment: 'test comment',
            consentsTerms: true,
            subscription: true,
            email: 'test@mail.com',
            fullName: 'name',
            phone: '123456789',
            companyName: 'company',
            address: 'address',
        })
    })

    test('Pilot application form called onSubmit after every required field has been filled', async () => {
        const { pilotAppSubmitHandler, selectProductOptions, screen } = renderForm()

        await selectTab(screen, 'pilotApplication')

        const [nameInput, emailInput, commentInput, phoneInput, companyInput] = [
            defaultFields.fieldName,
            defaultFields.fieldEmail,
            defaultFields.fieldComment,
            defaultFields.fieldPhone,
            defaultFields.fieldCompanyName,
        ].map((placeholder) => screen.getByPlaceholderText(placeholder))

        const [consents, subscription] = [
            defaultFields.checkboxConsentsTerms,
            defaultFields.checkboxSubscription,
        ].map((placeholder) => screen.getByText(placeholder))

        const productSelect = screen.getByTestId('product-toggle')
        const buttonSubmit = screen.getByText(defaultFields.buttonSubmit)

        await userEvent.click(productSelect)

        const option = screen.getByTestId('product-select-0')
        await userEvent.click(option, { delay: 100 })

        await userEvent.type(nameInput, 'name')
        await userEvent.type(companyInput, 'company')
        await userEvent.type(emailInput, 'test@mail.com')
        await userEvent.type(commentInput, 'test comment')
        await userEvent.type(phoneInput, '123456789')

        await userEvent.click(consents)
        await userEvent.click(subscription)

        await userEvent.click(buttonSubmit)

        expect(pilotAppSubmitHandler).toHaveBeenCalledWith({
            comment: 'test comment',
            consentsTerms: true,
            subscription: true,
            email: 'test@mail.com',
            fullName: 'name',
            phone: '123456789',
            companyName: 'company',
            product: selectProductOptions[0].value,
        })
    })
})
