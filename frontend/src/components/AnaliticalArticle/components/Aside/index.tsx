import cn from 'classnames'
import NextLink from 'next/link'
import { MouseEvent, useEffect, useState } from 'react'

import { Text } from '@/components/ui/typography/Text'
import { scrollToSection } from '@/utils/scrollToSection'

import styles from './index.module.scss'
export type TTitleTableOfContent = {
    name: string
    link: string
}
export default function Aside(props: { articleHeaders: TTitleTableOfContent[] }) {
    const [activeTitle, setActiveTitle] = useState<TTitleTableOfContent | null>(null)

    const handleClick = (e: MouseEvent<HTMLAnchorElement>, anchor: TTitleTableOfContent) => {
        e.stopPropagation()
        setActiveTitle(anchor)
        scrollToSection(anchor.link)
    }

    useEffect(() => {
        setActiveTitle(props.articleHeaders[0])
    }, [props.articleHeaders])
    return (
        <div className={styles.wrapper}>
            {props.articleHeaders.map((item) => {
                return (
                    <div key={item.name} className={styles.itemWrap}>
                        <NextLink href={`#${item.link}`} onClick={(e) => handleClick(e, item)}>
                            <Text
                                className={cn(styles.itemTitle, {
                                    [styles.itemTitle_active]:
                                        activeTitle && activeTitle.link === item.link,
                                })}
                                type="pL"
                            >
                                {item.name}
                            </Text>
                        </NextLink>
                    </div>
                )
            })}
        </div>
    )
}
