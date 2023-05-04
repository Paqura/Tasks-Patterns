import React, { useContext } from 'react'

import { TTypographyMode } from '@/components/ui/typography/types'

const TypographyThemeContext = React.createContext<TTypographyMode | undefined>(undefined)

export const TypographyTheme: React.FC<React.PropsWithChildren<{ theme: TTypographyMode }>> = ({
    children,
    theme,
}) => {
    return (
        <TypographyThemeContext.Provider value={theme}>{children}</TypographyThemeContext.Provider>
    )
}

export const useTypographyTheme = () => {
    return useContext(TypographyThemeContext)
}
