import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react'

const notImplemented = () => {
    throw new Error('Not implemented')
}

type TControlType = 'language' | 'search' | 'help'

type THeaderContext = {
    activeControl: TControlType | null

    isMobile: boolean

    setActiveControl: (control: TControlType) => void
    resetActiveControl: VoidFunction
    toggleActiveControl: (control: TControlType) => void
}

const context = createContext<THeaderContext>({
    isMobile: false,
    activeControl: null,
    setActiveControl: notImplemented,
    toggleActiveControl: notImplemented,
    resetActiveControl: notImplemented,
})

type THeaderContextProps = {
    isMobile: boolean
}

export const HeaderProvider = ({ children, isMobile }: PropsWithChildren<THeaderContextProps>) => {
    const [activeControl, setActiveControl] = useState<TControlType | null>(null)

    const contextValues = useMemo<THeaderContext>(
        () => ({
            activeControl,
            isMobile,

            setActiveControl,
            resetActiveControl: () => setActiveControl(null),
            toggleActiveControl: (control) => {
                setActiveControl((prev) => (prev === control ? null : control))
            },
        }),
        [activeControl, isMobile],
    )

    return <context.Provider value={contextValues}>{children}</context.Provider>
}

export const useHeaderContext = () => useContext(context)
