import { Controls } from '@/components/Header/components/Controls'
import { NavItem } from '@/components/Header/components/Nav/components/NavItem'
import { TNavItem } from '@/types'

import styles from './index.module.scss'

interface INav {
    items: TNavItem[]
    searchInputPlaceholder: string
    onToggle: (isOpen: boolean) => void
}

export const Nav = ({ items, searchInputPlaceholder, onToggle }: INav) => {
    return (
        <>
            <nav className={styles.nav}>
                {items.map((item) => (
                    <NavItem key={item.title} navItem={item} onToggle={onToggle} />
                ))}
            </nav>

            <Controls searchInputPlaceholder={searchInputPlaceholder} isMobileMode={false} />
        </>
    )
}
