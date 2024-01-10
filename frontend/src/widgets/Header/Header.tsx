import { MutableRefObject, useEffect, useRef, useState } from 'react'

import { NAV_ELEMENT_ID } from '@/shared/lib/constants'
import { useMedia, useOutsideClick } from '@/shared/lib/hooks'
import { Logo } from '@/shared/ui/project/Logo'
import { TImage, TNavItem } from '@/types'

import styles from './index.module.scss'
import { HeaderProvider, useHeaderContext } from './lib/context'
import { Nav } from './ui/Nav'
import { NavMobile } from './ui/NavMobile'

export type THeaderData = {
    logoImage: TImage | null
    navItems: TNavItem[]
    searchInputPlaceholder: string
}

type THeaderProps = {
    data: THeaderData
}

const Overlay = () => {
    const { activeControl, isNavOpen, resetActiveControl } = useHeaderContext()

    if (isNavOpen || activeControl !== null)
        return <div className={styles.overlay} onClick={resetActiveControl} />

    return null
}

export const Header = ({ data }: THeaderProps) => {
    const { navItems, searchInputPlaceholder, logoImage } = data

    const [isNavOpen, setIsNavOpen] = useState(false)
    const headerRef = useRef<HTMLElement | null>(null) as MutableRefObject<HTMLElement>

    const handleToggleNav = (isOpen: boolean) => {
        setIsNavOpen(isOpen)

        const element = document.body

        if (element) {
            element.style.overflowY = isOpen ? 'hidden' : ''
        }
    }

    useEffect(() => {
        const element = document.body
        return () => {
            element.style.overflowY = ''
        }
    }, [])

    useOutsideClick(isNavOpen, headerRef, () => {
        handleToggleNav(false)
    })

    const { isMobile } = useMedia()

    return (
        <HeaderProvider isMobile={isMobile} isNavOpen={isNavOpen}>
            <Overlay />
            <header ref={headerRef} className={styles.header} id={NAV_ELEMENT_ID}>
                <div>{logoImage && <Logo image={logoImage} href="/" />}</div>

                {isMobile && (
                    <NavMobile
                        items={navItems}
                        searchInputPlaceholder={searchInputPlaceholder}
                        isOpen={isNavOpen}
                        onToggle={handleToggleNav}
                    />
                )}

                {!isMobile && (
                    <Nav
                        items={navItems}
                        searchInputPlaceholder={searchInputPlaceholder}
                        onToggle={handleToggleNav}
                    />
                )}
            </header>
        </HeaderProvider>
    )
}
