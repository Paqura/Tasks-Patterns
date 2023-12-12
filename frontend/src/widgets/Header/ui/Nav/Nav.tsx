import { TNavItem } from '@/types'
import { Controls } from '@/widgets/Header/ui/Controls'

import styles from './index.module.scss'
import { NavItem } from './ui/NavItem'

type TNavProps = {
    items: TNavItem[]
    searchInputPlaceholder: string
    onToggle: (isOpen: boolean) => void
}

export const Nav = ({ items, searchInputPlaceholder, onToggle }: TNavProps) => {
    return (
        <>
            <nav className={styles.nav}>
                {items.map((item) => (
                    <NavItem key={item.title} navItem={item} onToggle={onToggle} />
                ))}
            </nav>

            <Controls searchInputPlaceholder={searchInputPlaceholder} />
        </>
    )
}
