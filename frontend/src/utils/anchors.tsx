import throttle from 'lodash/throttle'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'

type TAnchorsContextValue = {
    api: {
        watchSectionInViewport: (anchor: string, ref: React.RefObject<HTMLElement>) => () => void
        setActive: (anchor: string) => void
    }
    activeLink: string | null
}
const PageAnchorsContext = React.createContext<TAnchorsContextValue | undefined>(undefined)

export const PageAnchorsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [activeLink, setActiveLink] = useState<string | null>(null)
    const watchedNodesRef = useRef<{ link: string; el: HTMLElement }[]>([])

    const api = useRef<TAnchorsContextValue['api']>({
        watchSectionInViewport: (anchor, ref) => {
            if (ref.current) {
                const anchorTarget = { link: anchor, el: ref.current }
                watchedNodesRef.current.push(anchorTarget)
                return () => {
                    watchedNodesRef.current = watchedNodesRef.current.filter(
                        (t) => t !== anchorTarget
                    )
                }
            }
            return () => {}
        },
        setActive: (link) => setActiveLink(link),
    })

    useEffect(() => {
        const scrollRoot = document.querySelector('main')
        if (!scrollRoot) {
            return
        }

        const handleScroll = throttle(() => {
            const viewportCeter = scrollRoot.clientHeight / 2

            const nearestNode = watchedNodesRef.current.reduce<{
                link: string
                el: HTMLElement
            } | null>((prev, current) => {
                const currentRect = current.el.getBoundingClientRect()

                if (!prev?.el) {
                    return current
                }

                const prevRect = prev.el.getBoundingClientRect()

                const nearestEdgeCurrent = Math.min(
                    Math.abs(viewportCeter - currentRect.top),
                    Math.abs(viewportCeter - currentRect.bottom)
                )
                const nearestEdgePrevious = Math.min(
                    Math.abs(viewportCeter - prevRect.top),
                    Math.abs(viewportCeter - prevRect.bottom)
                )

                return nearestEdgeCurrent < nearestEdgePrevious ? current : prev
            }, null)

            setActiveLink(nearestNode?.link || null)
        }, 300)

        scrollRoot?.addEventListener('scroll', handleScroll)

        return () => scrollRoot?.removeEventListener('scroll', handleScroll)
    }, [])

    const context: TAnchorsContextValue = useMemo(() => {
        return {
            api: api.current,
            activeLink: activeLink,
        }
    }, [activeLink])

    return <PageAnchorsContext.Provider value={context}>{children}</PageAnchorsContext.Provider>
}

const defaultContext: TAnchorsContextValue = {
    api: { watchSectionInViewport: () => () => {}, setActive: () => {} },
    activeLink: null,
}

export const useAnchors = () => {
    return useContext(PageAnchorsContext) || defaultContext
}
