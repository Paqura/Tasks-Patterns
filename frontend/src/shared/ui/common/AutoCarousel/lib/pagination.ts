import cn from 'classnames'
import { PaginationOptions } from 'swiper/types'

export const SLIDE_LIFETIME = 4_000

type TGetPagination = {
    slidesCount: number
    classes?: TClasses<'root' | 'progress'>
}

export const getPagination = ({
    slidesCount,
    classes,
}: TGetPagination): PaginationOptions | undefined => {
    if (slidesCount <= 1) return undefined

    return {
        clickable: true,
        renderBullet: function (_index: number, className: string) {
            return `
            <span class="${cn(className, classes?.root)}">
                <span
                    class="${classes?.progress}"
                    style="transition-duration: ${SLIDE_LIFETIME}ms"
                ></span>
            </span>
        `
        },
    }
}
