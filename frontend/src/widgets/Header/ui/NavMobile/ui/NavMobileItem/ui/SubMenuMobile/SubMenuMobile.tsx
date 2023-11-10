import NextLink from 'next/link'

import { useTranslate } from '@/shared/lib/translate'
import { Button } from '@/shared/ui/common/Button'
import { Text } from '@/shared/ui/common/typography/Text'
import { TNavSubItem } from '@/types'

import styles from './index.module.scss'

type TSubMenuMobile = {
    subItems: TNavSubItem[]
    anchor: string | undefined
    onClick: () => void
}

export const SubMenuMobile = ({ subItems, anchor, onClick }: TSubMenuMobile) => {
    const translate = useTranslate()
    return (
        <>
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
            {anchor && (
                <Button className={styles.button} link={anchor} size="s" onClick={onClick}>
                    {translate('navigation.jumpBtn')}
                </Button>
            )}
        </>
    )
}
