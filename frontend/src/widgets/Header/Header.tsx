import { MutableRefObject, useEffect, useRef, useState } from 'react'

import { NAV_ELEMENT_ID } from '@/shared/lib/constants'
import { useIsMobile, useOutsideClick } from '@/shared/lib/hooks'
import { Logo } from '@/shared/ui/project/Logo'
import { TNavItem } from '@/types'

import styles from './index.module.scss'
import { Nav } from './ui/Nav'
import { NavMobile } from './ui/NavMobile'

export type THeaderData = {
    navItems: TNavItem[]
    searchInputPlaceholder: string
}

type THeaderProps = {
    data: THeaderData
}

export const Header = ({ data }: THeaderProps) => {
    const { navItems, searchInputPlaceholder } = data

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

    const isMobile = useIsMobile()

    return (
        <>
            {isNavOpen && <div className={styles.overlay} />}
            <header ref={headerRef} className={styles.header} id={NAV_ELEMENT_ID}>
                <Logo href="/" image={{ src: '', alt: '' }} />
                {isMobile ? (
                    <NavMobile
                        items={navItems}
                        searchInputPlaceholder={searchInputPlaceholder}
                        isOpen={isNavOpen}
                        onToggle={handleToggleNav}
                    />
                ) : (
                    <Nav
                        items={navItems}
                        searchInputPlaceholder={searchInputPlaceholder}
                        onToggle={handleToggleNav}
                    />
                )}
            </header>
        </>
    )
}
