import cn from 'classnames'
import NextLink from 'next/link'
import React, { useState } from 'react'

import { SubMenu } from '@/components/Nav/components/SubMenu'
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

    const handleMouseEnter = () => {
        subItems && onToggle(true)
        setIsItemActive(true)
    }

    const handleMouseLeave = () => {
        subItems && onToggle(false)
        setIsItemActive(false)
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <NextLink
                href={link}
                className={cn(styles.nav_item, {
                    [styles.nav_item_active]: isItemActive && subItems,
                })}
            >
                <Text type="pM">{title}</Text>
            </NextLink>
            {isItemActive && subItems && <SubMenu subItems={subItems} anchor={link} />}
        </div>
    )
}
