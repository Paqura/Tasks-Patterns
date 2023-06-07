import cn from 'classnames'
import Image from 'next/image'
import NextLink from 'next/link'
import React, { MouseEvent } from 'react'

import { Text } from '@/components/ui/typography/Text'
import { useAnchors } from '@/utils/anchors'

import arrowRight2 from '/public/images/common/arrow-right-2.svg'

import styles from './index.module.scss'
export type TTitleTableOfContent = {
    name: string
    link: string
}
export const Aside: React.FC<{ articleHeaders: TTitleTableOfContent[] }> = (props) => {
    const { activeLink, api } = useAnchors()

    const handleClick = (e: MouseEvent<HTMLAnchorElement>, anchor: TTitleTableOfContent) => {
        api.setActive(anchor.link)
    }
    return (
        <div className={styles.wrapper}>
            {props.articleHeaders.map((item) => {
                return (
                    <NextLink
                        key={item.name}
                        href={`#${item.link}`}
                        onClick={(e) => handleClick(e, item)}
                    >
                        <span
                            key={item.name}
                            className={cn(styles.itemWrap, {
                                [styles.itemWrap_active]: activeLink === item.link,
                            })}
                        >
                            <Text className={styles.itemTitle} type="pL">
                                {item.name}
                            </Text>
                            <Image
                                className={cn(styles.icon)}
                                src={arrowRight2}
                                alt="Arrow right"
                            />
                        </span>
                    </NextLink>
                )
            })}
        </div>
    )
}
