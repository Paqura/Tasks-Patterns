import cn from 'classnames'
import NextLink from 'next/link'
import React, { useRef, useState } from 'react'

import { Text } from '@/shared/ui/common/typography/Text'
import { TNavItem } from '@/types'
import { SubMenu } from '@/widgets/Header/ui/Nav/ui/SubMenu'

import styles from './index.module.scss'

type TNavItemProps = {
    navItem: TNavItem
    onToggle: (isOpen: boolean) => void
}

export const NavItem = ({ navItem, onToggle }: TNavItemProps) => {
    const [isItemActive, setIsItemActive] = useState(false)
    const { link, subItems, title } = navItem
    const isSubItemsExist = subItems.length > 0

    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const handleMouseEnter = () => {
        isSubItemsExist && onToggle(true)
        setIsItemActive(true)

        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
    }

    const deactivateItem = () => {
        isSubItemsExist && onToggle(false)
        setIsItemActive(false)
    }

    const handleMouseLeave = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
            deactivateItem()
        }, 100)
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

            {isItemActive && isSubItemsExist && (
                <SubMenu subItems={subItems} anchor={link} onClick={deactivateItem} />
            )}
        </div>
    )
}
