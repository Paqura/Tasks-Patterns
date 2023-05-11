import Image from 'next/image'

import { NavMobileItem } from '@/components/NavMobile/components/NavMobileItem'
import { TNavItem } from '@/types'

import styles from './index.module.scss'

import burger from 'public/images/menu/burger.svg'
import close from 'public/images/menu/close.svg'

interface INavMobile {
    items: TNavItem[]
    isOpen: boolean
    onToggle: (isOpen: boolean) => void
}

export const NavMobile = ({ items, isOpen, onToggle }: INavMobile) => {
    const handleClick = () => {
        onToggle(!isOpen)
    }

    return (
        <div className={styles.wrapper}>
            <button className={styles.button} onClick={handleClick}>
                <Image
                    src={isOpen ? close : burger}
                    alt={isOpen ? 'Закрыть меню' : 'Открыть меню'}
                />
            </button>
            {isOpen && (
                <nav className={styles.nav}>
                    <div className={styles.nav_list}>
                        {items.map((navItem) => (
                            <NavMobileItem key={navItem.title} navItem={navItem} />
                        ))}
                    </div>
                </nav>
            )}
        </div>
    )
}
