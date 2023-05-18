export enum EScreenEdges {
    desktopSmall = 1279,
    mobile = 1023,
}

export type TImage = {
    src: string
    width?: number
    height?: number
}

export type TVideo = {
    src: string
}

export type TNavSubItem = {
    title: string
    description?: string
    link: string
}

export type TNavItem = {
    title: string
    link: string
    subItems: TNavSubItem[]
}

export type TFooterNavItem = {
    name: string
    link: string
}
