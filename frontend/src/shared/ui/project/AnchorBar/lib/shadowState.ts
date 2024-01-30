import { useCallback, useState } from 'react'
import { SwiperClass } from 'swiper/react'

type TShadowState = {
    start: boolean
    end: boolean
}

export const useShadowState = () => {
    const [shadowState, setShadowState] = useState<TShadowState>({
        start: false,
        end: false,
    })

    const handleShadowStateChange = useCallback((swiper: SwiperClass) => {
        setShadowState({
            end: !swiper.isEnd,
            start: !swiper.isBeginning,
        })
    }, [])

    return {
        shadowState,
        handleShadowStateChange,
    }
}
