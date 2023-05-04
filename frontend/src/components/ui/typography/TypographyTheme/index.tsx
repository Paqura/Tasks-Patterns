import React, { useContext } from 'react'

import { TTypographyTheme } from '@/components/ui/typography/types'

const TypographyThemeContext = React.createContext<TTypographyTheme | undefined>(undefined)

export const TypographyTheme: React.FC<React.PropsWithChildren<{ theme: TTypographyTheme }>> = ({
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
