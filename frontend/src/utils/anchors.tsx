import React, { useContext, useMemo, useRef, useState } from 'react'

type TAnchorsContextValue = {
    api: {
        watchSectionInViewport: (
            anchor: string,
            ref: React.RefObject<HTMLElement>,
            threshold?: number
        ) => () => void
        setActive: (anchor: string) => void
    }
    activeLink: string | null
}
const PageAnchorsContext = React.createContext<TAnchorsContextValue | undefined>(undefined)

export const PageAnchorsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [activeLink, setActiveLink] = useState<string | null>(null)

    const api = useRef<TAnchorsContextValue['api']>({
        watchSectionInViewport: (anchor, ref, threshold = 0.55) => {
            if (ref.current) {
                let observer = new IntersectionObserver(
                    (entries) => {
                        if (!entries[0]) {
                            return
                        }

                        if (
                            entries[0].isIntersecting &&
                            entries[0].intersectionRatio >= threshold
                        ) {
                            setActiveLink(anchor)
                        }
                    },
                    {
                        threshold,
                        root: document.querySelector('main'),
                        rootMargin: '-1px',
                    }
                )
                observer.observe(ref.current)
                return () => observer.disconnect()
            }
            return () => {}
        },
        setActive: (link) => setActiveLink(link),
    })

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
