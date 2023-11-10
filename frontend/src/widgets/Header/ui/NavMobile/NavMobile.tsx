import Image from 'next/image'

import { TNavItem } from '@/types'
import { Controls } from '@/widgets/Header/ui/Controls'

import styles from './index.module.scss'
import { NavMobileItem } from './ui/NavMobileItem'

import burger from 'public/images/menu/burger.svg'
import close from 'public/images/menu/close.svg'

type TNavMobileProps = {
    items: TNavItem[]
    searchInputPlaceholder: string
    isOpen: boolean
    onToggle: (isOpen: boolean) => void
}

export const NavMobile = ({ items, searchInputPlaceholder, isOpen, onToggle }: TNavMobileProps) => {
    const handleClick = () => {
        onToggle(!isOpen)
    }

    return (
        <div className={styles.wrapper}>
            <button className={styles.button} onClick={handleClick}>
                <Image src={isOpen ? close : burger} alt={isOpen ? 'Close' : 'Open'} />
            </button>

            {isOpen && (
                <nav className={styles.nav}>
                    <Controls
                        searchInputPlaceholder={searchInputPlaceholder}
                        isMobileMode={true}
                        onToggle={onToggle}
                    />

                    <div className={styles.nav_list}>
                        {items.map((navItem) => (
                            <NavMobileItem
                                key={navItem.title}
                                navItem={navItem}
                                onClick={handleClick}
                            />
                        ))}
                    </div>
                </nav>
            )}
        </div>
    )
}
