import cn from 'classnames'
import Image from 'next/image'
import NextLink from 'next/link'
import { MouseEvent } from 'react'

import { Text } from '@/components/ui/typography/Text'
import { useAnchors } from '@/utils/anchors'

import arrowRight2 from '/public/images/common/arrow-right-2.svg'

import styles from './index.module.scss'
export type TTitleTableOfContent = {
    name: string
    link: string
}
export default function Aside(props: { articleHeaders: TTitleTableOfContent[] }) {
    const { activeLink, api } = useAnchors()

    const handleClick = (e: MouseEvent<HTMLAnchorElement>, anchor: TTitleTableOfContent) => {
        api.setActive(anchor.link)
    }
    return (
        <>
            <div className={styles.wrapper}>
                {props.articleHeaders.map((item) => {
                    return (
                        <NextLink
                            key={item.name}
                            href={`#${item.link}`}
                            onClick={(e) => handleClick(e, item)}
                        >
                            <div key={item.name} className={styles.itemWrap}>
                                <Text
                                    className={cn(styles.itemTitle, {
                                        [styles.itemTitle_active]: activeLink === item.link,
                                    })}
                                    type="pL"
                                >
                                    {item.name}
                                </Text>
                                {activeLink === item.link && (
                                    <Image
                                        className={styles.icon}
                                        src={arrowRight2}
                                        alt="Arrow right"
                                    />
                                )}
                            </div>
                        </NextLink>
                    )
                })}
            </div>
        </>
    )
}
