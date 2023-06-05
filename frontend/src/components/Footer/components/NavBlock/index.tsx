import NextLink from 'next/link'

import { Text } from '@/components/ui/typography/Text'
import { TFooterNavItem } from '@/types'

import styles from './index.module.scss'

export type TNavBlockData = {
    title: string
    navItems: TFooterNavItem[]
}

type TProps = {
    className?: string
} & TNavBlockData

export const NavBlock = ({ className, title, navItems }: TProps) => {
    return (
        <div className={className}>
            <Text type="pL" className={styles.title}>
                {title}
            </Text>
            {navItems.map((navItem, index) => {
                const isInternal = /^\//.test(navItem.link)

                if (!isInternal) {
                    return (
                        <a
                            key={index}
                            href={navItem.link}
                            target={'_blank'}
                            className={styles.list_item}
                        >
                            <Text type="pL">{navItem.name}</Text>
                        </a>
                    )
                }

                return (
                    <NextLink key={index} href={navItem.link} className={styles.list_item}>
                        <Text type="pL">{navItem.name}</Text>
                    </NextLink>
                )
            })}
        </div>
    )
}
