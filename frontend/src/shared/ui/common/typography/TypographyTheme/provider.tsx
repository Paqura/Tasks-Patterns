import React, { PropsWithChildren, useContext } from 'react'

import { TTypographyMode } from '@/shared/ui/common/typography/types'

const TypographyThemeContext = React.createContext<TTypographyMode | null>(null)

type TTypographyThemeProps = {
    theme: TTypographyMode
}

export const TypographyTheme = ({ children, theme }: PropsWithChildren<TTypographyThemeProps>) => {
    return (
        <TypographyThemeContext.Provider value={theme}>{children}</TypographyThemeContext.Provider>
    )
}

export const useTypographyTheme = () => {
    return useContext(TypographyThemeContext)
}
