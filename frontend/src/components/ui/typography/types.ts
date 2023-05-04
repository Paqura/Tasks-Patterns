export type THeadingLevel = 1 | 2 | 3
export type TTextType = 'pL' | 'pM' | 'pS' | 'pHeadline' | 'postscript' | 'quote'

export type TTypographyMode = 'light' | 'dark'

export type TTypographyTheme = {
    headingClasses: { [key in THeadingLevel]: string }
    textClasses: { [key in TTextType]: string }
}
