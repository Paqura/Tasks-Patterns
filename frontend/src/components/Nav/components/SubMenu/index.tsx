import NextLink from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/typography/Text'
import { TNavSubItem } from '@/types'

import styles from './index.module.scss'

interface ISubMenu {
    subItems: TNavSubItem[]
    anchor: string | undefined
}

export const SubMenu: React.FC<ISubMenu> = ({ subItems, anchor }) => {
    return (
        <div className={styles.sub_menu}>
            <div className={styles.sub_menu_items}>
                {subItems?.map((subItem) => (
                    <NextLink
                        key={subItem.title}
                        href={subItem.link}
                        className={styles.sub_menu_item}
                    >
                        <Text type="headerHeading" className={styles.title}>
                            {subItem.title}
                        </Text>
                        <Text type="pS" className={styles.description}>
                            {subItem.description}
                        </Text>
                    </NextLink>
                ))}
            </div>
            {anchor && (
                <Button className={styles.button} link={anchor} size="s">
                    Jump to section
                </Button>
            )}
        </div>
    )
}