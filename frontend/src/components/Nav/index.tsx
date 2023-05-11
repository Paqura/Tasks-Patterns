import React from 'react'

import { NavItem } from '@/components/Nav/components/NavItem'
import { TNavItem } from '@/types'

import styles from './index.module.scss'

interface INav {
    items: TNavItem[]
    onToggle: (isOpen: boolean) => void
}

export const Nav = ({ items, onToggle }: INav) => {
    return (
        <nav className={styles.nav}>
            {items.map((item) => (
                <NavItem key={item.title} navItem={item} onToggle={onToggle} />
            ))}
        </nav>
    )
}
