import cn from 'classnames'
import Image from 'next/image'
import NextLink from 'next/link'
import { useCallback, useState } from 'react'

import { SubMenuMobile } from '@/components/NavMobile/components/SubMenuMobile'
import { Text } from '@/components/ui/typography/Text'
import { TNavItem } from '@/types'

import styles from './index.module.scss'

import angle from '/public/images/icons/angle.svg'

interface INavMobileItem {
    navItem: TNavItem
}

export const NavMobileItem = ({ navItem }: INavMobileItem) => {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
    const { title, link, subItems } = navItem

    const renderNavLink = useCallback(() => {
        if (subItems) {
            return (
                <button
                    className={cn(styles.nav_item, { [styles.nav_item_open]: isSubmenuOpen })}
                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                >
                    <Text type="pM">{title}</Text>
                    <Image
                        src={angle}
                        alt={isSubmenuOpen ? 'Свернуть' : 'Развернуть'}
                        className={styles.icon}
                    />
                </button>
            )
        }

        if (link) {
            return (
                <NextLink href={link} className={styles.nav_item}>
                    <Text type="pM">{title}</Text>
                </NextLink>
            )
        }

        return <Text type="pM">{title}</Text>
    }, [isSubmenuOpen, link, subItems, title])

    return (
        <div className={cn({ [styles.wrapper_open]: isSubmenuOpen })}>
            {renderNavLink()}
            {subItems && isSubmenuOpen && <SubMenuMobile subItems={subItems} />}
        </div>
    )
}
