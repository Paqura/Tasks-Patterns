import { useEffect } from 'react'

const YA_ID = process.env.NEXT_PUBLIC_YM_ID

const clickAnyButtonHandler = () => {
    // @ts-expect-error ym part of global scope without types
    window.ym(YA_ID, 'reachGoal', 'click_any_button')
}

const getInTouchStartFillingHandler = () => {
    // @ts-expect-error ym part of global scope without types
    window.ym(YA_ID, 'reachGoal', 'start_form_get_in_touch')
}

const clickInviteButtonHandler = () => {
    // @ts-expect-error ym part of global scope without types
    window.ym(YA_ID, 'reachGoal', 'click_button_book_a_meeting')
}

export const useYaMetricaGitex = () => {
    useEffect(() => {
        const buttons = Array.from(document.body.querySelectorAll('button'))

        buttons.forEach((button) => {
            button.addEventListener('click', clickAnyButtonHandler)
        })

        return () => {
            buttons.forEach((button) => {
                button.removeEventListener('click', clickAnyButtonHandler)
            })
        }
    }, [])

    useEffect(() => {
        const linkInvite = document.querySelector('a[href="#inviteForm"]')

        if (!linkInvite) return

        linkInvite.addEventListener('click', clickInviteButtonHandler)

        return () => {
            linkInvite.removeEventListener('click', clickInviteButtonHandler)
        }
    }, [])

    useEffect(() => {
        const anyQuestionFormSection = document.querySelector('#inviteForm')
        const inviteForm = anyQuestionFormSection?.querySelector('form')

        if (!inviteForm) return

        let alreadyType = false

        const inputs = Array.from(inviteForm.querySelectorAll('input'))

        const handleStartFilling = () => {
            if (alreadyType) return
            getInTouchStartFillingHandler()
            alreadyType = true
        }

        inputs.forEach((field) => {
            field.addEventListener('change', handleStartFilling)
        })

        return () => {
            inputs.forEach((field) => {
                field.removeEventListener('change', handleStartFilling)
            })
        }
    }, [])
}
