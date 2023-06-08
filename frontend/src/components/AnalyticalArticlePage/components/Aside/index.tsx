import cn from 'classnames'
import Image from 'next/image'
import React from 'react'

import { Text } from '@/components/ui/typography/Text'
import { useAnchors } from '@/utils/anchors'

import arrowRight2 from '/public/images/common/arrow-right-2.svg'

import styles from './index.module.scss'
export type TTitleTableOfContent = {
    name: string
    link: string
}
export const Aside: React.FC<{ articleHeaders: TTitleTableOfContent[] }> = (props) => {
    const { activeLink } = useAnchors()

    return (
        <div className={styles.wrapper}>
            {props.articleHeaders.map((item) => {
                return (
                    <a key={item.link} href={`#${item.link}`}>
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
                    </a>
                )
            })}
        </div>
    )
}
