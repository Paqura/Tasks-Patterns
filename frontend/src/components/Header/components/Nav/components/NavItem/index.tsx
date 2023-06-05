import cn from 'classnames'
import NextLink from 'next/link'
import React, { useState } from 'react'

import { SubMenu } from '@/components/Header/components/Nav/components/SubMenu'
import { Text } from '@/components/ui/typography/Text'
import { TNavItem } from '@/types'

import styles from './index.module.scss'

interface INavItem {
    navItem: TNavItem
    onToggle: (isOpen: boolean) => void
}

export const NavItem: React.FC<INavItem> = ({ navItem, onToggle }) => {
    const [isItemActive, setIsItemActive] = useState(false)
    const { link, subItems, title } = navItem
    const isSubItemsExist = subItems.length > 0

    const handleMouseEnter = () => {
        isSubItemsExist && onToggle(true)
        setIsItemActive(true)
    }

    const handleMouseLeave = () => {
        isSubItemsExist && onToggle(false)
        setIsItemActive(false)
    }

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (isSubItemsExist) {
            event.preventDefault()
        }
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <NextLink
                href={link}
                className={cn(styles.nav_item, {
                    [styles.nav_item_active]: isItemActive,
                })}
                onClick={handleClick}
            >
                <Text type="pM">{title}</Text>
            </NextLink>
            {isItemActive && isSubItemsExist && <SubMenu subItems={subItems} anchor={link} />}
        </div>
    )
}
