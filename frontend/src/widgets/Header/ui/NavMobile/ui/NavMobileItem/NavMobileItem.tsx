import cn from 'classnames'
import Image from 'next/image'
import NextLink from 'next/link'
import { useCallback, useState } from 'react'

import { Text } from '@/shared/ui/common/typography/Text'
import { TNavItem } from '@/types'

import styles from './index.module.scss'

import angle from '/public/images/common/angle.svg'

import { SubMenuMobile } from './ui/SubMenuMobile'

type TNavMobileItemProps = {
    navItem: TNavItem
    onClick: () => void
}

export const NavMobileItem = ({ navItem, onClick }: TNavMobileItemProps) => {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
    const { title, link, subItems } = navItem

    const isSubItemsExist = subItems.length > 0

    const renderNavLink = useCallback(() => {
        if (isSubItemsExist) {
            return (
                <button
                    className={cn(styles.nav_item, { [styles.nav_item_open]: isSubmenuOpen })}
                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                >
                    <Text type="pM">{title}</Text>
                    <Image
                        src={angle}
                        alt={isSubmenuOpen ? 'Close' : 'Open'}
                        className={styles.icon}
                    />
                </button>
            )
        }

        if (link) {
            return (
                <NextLink href={link} className={styles.nav_item} onClick={onClick}>
                    <Text type="pM">{title}</Text>
                </NextLink>
            )
        }

        return <Text type="pM">{title}</Text>
    }, [isSubmenuOpen, link, isSubItemsExist, title, onClick])

    return (
        <div className={cn({ [styles.wrapper_open]: isSubmenuOpen })}>
            {renderNavLink()}
            {isSubItemsExist && isSubmenuOpen && (
                <SubMenuMobile subItems={subItems} anchor={link} onClick={onClick} />
            )}
        </div>
    )
}
