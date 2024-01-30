import throttle from 'lodash/throttle'
import React, {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'

type TAnchorsContextApi = {
    watchSectionInViewport: (anchor: string, ref: React.RefObject<HTMLElement>) => () => void
    setActive: (anchor: string) => void
}

type TAnchorsContextValue = {
    api: TAnchorsContextApi
    activeLink: string | null
}

const defaultContext: TAnchorsContextValue = {
    api: {
        watchSectionInViewport: () => () => {},
        setActive: () => {},
    },
    activeLink: null,
}

type TWatchedNodeRef = { link: string; el: HTMLElement }

const PageAnchorsContext = createContext<TAnchorsContextValue>(defaultContext)

export const PageAnchorsContextProvider = ({ children }: PropsWithChildren) => {
    const [activeLink, setActiveLink] = useState<string | null>(null)
    const watchedNodesRef = useRef<TWatchedNodeRef[]>([])

    const api = useRef<TAnchorsContextApi>({
        watchSectionInViewport: (anchor, ref) => {
            if (!ref.current) return () => {}

            const anchorTarget = { link: anchor, el: ref.current }
            watchedNodesRef.current.push(anchorTarget)

            return () => {
                watchedNodesRef.current = watchedNodesRef.current.filter(
                    (node) => node !== anchorTarget,
                )
            }
        },

        setActive: setActiveLink,
    })

    useEffect(() => {
        const scrollRoot = document

        if (!scrollRoot) return

        const getNearestEdge = (viewPortCenter: number, rect: DOMRect) =>
            Math.min(Math.abs(viewPortCenter - rect.top), Math.abs(viewPortCenter - rect.bottom))

        const THROTTLE_DELAY = 300

        const handleScroll = throttle(() => {
            const viewportCenter = window.innerHeight / 2

            const nearestNode = watchedNodesRef.current.reduce<TWatchedNodeRef | null>(
                (prev, current) => {
                    const currentRect = current.el.getBoundingClientRect()

                    if (!prev?.el) return current

                    const prevRect = prev.el.getBoundingClientRect()

                    const nearestEdgeCurrent = getNearestEdge(viewportCenter, currentRect)
                    const nearestEdgePrevious = getNearestEdge(viewportCenter, prevRect)

                    return nearestEdgeCurrent < nearestEdgePrevious ? current : prev
                },
                null,
            )

            setActiveLink(nearestNode?.link || null)
        }, THROTTLE_DELAY)

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

export const useAnchors = () => {
    return useContext(PageAnchorsContext)
}
