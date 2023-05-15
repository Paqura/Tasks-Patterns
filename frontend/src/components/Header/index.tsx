import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import React, { MutableRefObject, useRef, useState } from 'react'

import { Nav } from '@/components/Nav'
import { NavMobile } from '@/components/NavMobile'
import { Logo } from '@/components/ui/Logo'
import { TNavItem } from '@/types'
import { useIsDesktopSmall, useOutsideClick } from '@/utils/hooks'

import styles from './index.module.scss'

export type THeaderData = {
    navItems: TNavItem[]
}

export const Header: React.FC<THeaderData> = ({ navItems }) => {
    const [isNavOpen, setIsNavOpen] = useState(false)
    const headerRef = useRef<HTMLElement | null>(null) as MutableRefObject<HTMLElement>

    const handleToggleNav = (isOpen: boolean) => {
        const headerEl = headerRef.current
        if (headerEl) {
            isOpen ? disableBodyScroll(headerEl) : enableBodyScroll(headerEl)
            setIsNavOpen(isOpen)
        }
    }

    const handleCloseMenu = () => {
        enableBodyScroll(headerRef.current)
        setIsNavOpen(false)
    }

    useOutsideClick(isNavOpen, headerRef, handleCloseMenu)
    const isDesktopSmall = useIsDesktopSmall()

    return (
        <>
            {isNavOpen && <div className={styles.overlay} />}
            <header ref={headerRef} className={styles.header}>
                <Logo href="/" />
                {isDesktopSmall ? (
                    <NavMobile items={navItems} onToggle={handleToggleNav} isOpen={isNavOpen} />
                ) : (
                    <Nav items={navItems} onToggle={handleToggleNav} />
                )}
            </header>
        </>
    )
}
