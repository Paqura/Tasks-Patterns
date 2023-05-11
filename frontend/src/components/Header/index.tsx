import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import React, { MutableRefObject, useRef, useState } from 'react'

import { Nav } from '@/components/Nav'
import { NavMobile } from '@/components/NavMobile'
import { Logo } from '@/components/ui/Logo'
import { TNavItem } from '@/types'
import { useIsDesktopSmall, useOutsideClick } from '@/utils/hooks'

import styles from './index.module.scss'

const navMock: TNavItem[] = [
    {
        title: 'Products',
        link: '/#products',
        subItems: [
            {
                title: 'MaxPatrol SIEM',
                description: 'Real-time detection of IS incidents',
                link: '/',
            },
            {
                title: 'MaxPatrol VM',
                description: 'A new generation system for vulnerability management',
                link: '/',
            },
            {
                title: 'PT Sandbox',
                description: 'The first sandbox that protects exactly your infrastructure',
                link: '/',
            },
            {
                title: 'PT Sandbox',
                description: 'The first sandbox that protects exactly your infrastructure',
                link: '/',
            },
            {
                title: 'XSpider',
                description: 'Vulnerability scanner',
                link: '/',
            },
            {
                title: 'PT Application Inspector',
                description: 'Application security analyser',
                link: '/',
            },
            {
                title: 'PT Network Attack Discovery',
                description: 'Traffic Analysis System (NTA) for attack detection',
                link: '/',
            },
            {
                title: 'PT ISIM',
                description: 'Management of cyber security incidents of the APCS',
                link: '/',
            },
        ],
    },
    {
        title: 'Analytics',
        link: '/analytics',
    },
    {
        title: 'News & Events',
        link: 'news',
    },
    {
        title: 'About us',
        link: '/about-us',
    },
]

export const Header: React.FC = () => {
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
                    <NavMobile items={navMock} onToggle={handleToggleNav} isOpen={isNavOpen} />
                ) : (
                    <Nav items={navMock} onToggle={handleToggleNav} />
                )}
            </header>
        </>
    )
}
