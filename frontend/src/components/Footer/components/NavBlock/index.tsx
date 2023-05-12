import NextLink from 'next/link'

import { Text } from '@/components/ui/typography/Text'
import { TFooterNavItem } from '@/types'

import styles from './index.module.scss'

interface INavBlock {
    className?: string
    title: string
    navItems: TFooterNavItem[]
}

export const NavBlock = ({ className, title, navItems }: INavBlock) => {
    return (
        <div className={className}>
            <Text type="pL" className={styles.title}>
                {title}
            </Text>
            <div>
                {navItems.map((navItem, index) => (
                    <NextLink key={index} href={navItem.link} className={styles.list_item}>
                        <Text type="pL">{navItem.name}</Text>
                    </NextLink>
                ))}
            </div>
        </div>
    )
}
