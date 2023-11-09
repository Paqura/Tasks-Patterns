import NextLink from 'next/link'

import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/typography/Text'
import { TNavSubItem } from '@/types'
import { useTranslate } from '@/utils/translate'

import styles from './index.module.scss'

type TSubMenuProps = {
    subItems: TNavSubItem[]
    anchor: string | undefined
    onClick: () => void
}

export const SubMenu = ({ subItems, anchor, onClick }: TSubMenuProps) => {
    const translate = useTranslate()
    return (
        <div className={styles.sub_menu}>
            <div className={styles.sub_menu_items}>
                {subItems?.map((subItem) => (
                    <NextLink
                        key={subItem.title}
                        href={subItem.link}
                        className={styles.sub_menu_item}
                        onClick={onClick}
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
                <Button className={styles.button} link={anchor} size="s" onClick={onClick}>
                    {translate('navigation.jumpBtn')}
                </Button>
            )}
        </div>
    )
}
