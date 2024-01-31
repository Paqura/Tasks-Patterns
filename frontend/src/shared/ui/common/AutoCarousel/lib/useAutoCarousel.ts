import { useEffect, useState } from 'react'

export const useAutoCarousel = () => {
    const [animationStarted, setAnimationStarted] = useState(false)

    useEffect(() => {
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
