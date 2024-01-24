export type TDisableStatus = 'prev' | 'next' | 'both' | 'none'

export type TGetDisableStatus = {
    next: boolean
    prev: boolean
}

export const getDisableStatus = ({ next, prev }: TGetDisableStatus): TDisableStatus => {
    if (next && prev) return 'both'

    if (next) return 'next'
    if (prev) return 'prev'

    return 'none'
}
