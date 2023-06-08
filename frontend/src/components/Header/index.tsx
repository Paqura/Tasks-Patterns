import React, { MutableRefObject, useEffect, useRef, useState } from 'react'

import { Logo } from '@/components/ui/Logo'
import { TNavItem } from '@/types'
import { NAV_ELEMENT_ID } from '@/utils/constants'
import { useIsDesktopSmall, useOutsideClick } from '@/utils/hooks'

import { Nav } from './components/Nav'
import { NavMobile } from './components/NavMobile'
import styles from './index.module.scss'

export type THeaderData = {
    navItems: TNavItem[]
    searchInputPlaceholder: string
}

type THeaderProps = {
    data: THeaderData
}

export const Header: React.FC<THeaderProps> = ({ data }) => {
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

    const handleCloseMenu = () => {
        setIsNavOpen(false)

        const element = document.body
        if (element) {
            element.style.overflowY = ''
        }
    }

    useEffect(() => {
        const element = document.body
        return () => {
            element.style.overflowY = ''
        }
    }, [])

    useOutsideClick(isNavOpen, headerRef, handleCloseMenu)
    const isDesktopSmall = useIsDesktopSmall()

    return (
        <>
            {isNavOpen && <div className={styles.overlay} />}
            <header ref={headerRef} className={styles.header} id={NAV_ELEMENT_ID}>
                <Logo href="/" />
                {isDesktopSmall ? (
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
