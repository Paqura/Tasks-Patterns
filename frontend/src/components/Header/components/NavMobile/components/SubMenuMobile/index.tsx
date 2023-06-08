import NextLink from 'next/link'

import { Text } from '@/components/ui/typography/Text'
import { TNavSubItem } from '@/types'

import styles from './index.module.scss'

interface ISubMenuMobile {
    subItems: TNavSubItem[]
    onClick: () => void
}

export const SubMenuMobile = ({ subItems, onClick }: ISubMenuMobile) => {
    return (
        <div className={styles.list}>
            {subItems.map((subItem) => (
                <NextLink
                    key={subItem.title}
                    href={subItem.link}
                    className={styles.list_item}
                    onClick={onClick}
                >
                    <Text type="headerHeading" className={styles.title}>
                        {subItem.title}
                    </Text>
                    {subItem.description && (
                        <Text type="pS" className={styles.description}>
                            {subItem.description}
                        </Text>
                    )}
                </NextLink>
            ))}
        </div>
    )
}
