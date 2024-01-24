import { useLayoutEffect, useState } from 'react'

export const useAutoCarousel = () => {
    const [animationStarted, setAnimationStarted] = useState(false)

    useLayoutEffect(() => {
        setTimeout(() => {
            requestAnimationFrame(() => {
                setAnimationStarted(true)
            })
        }, 0)
    }, [])

    return {
        animationStarted,
    }
}
