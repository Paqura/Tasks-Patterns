import { RefObject, useEffect } from 'react'
import { SwiperClass } from 'swiper/react'

export const useResize = (swiperRef: RefObject<SwiperClass | undefined>) => {
    useEffect(() => {
        const handleResize = () => {
            if (!swiperRef.current) {
                return
            }
            swiperRef.current.update()
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [swiperRef])
}
