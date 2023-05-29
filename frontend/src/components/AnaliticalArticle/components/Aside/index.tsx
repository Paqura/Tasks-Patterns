import cn from 'classnames'
import Image from 'next/image'
import NextLink from 'next/link'
import { MouseEvent, useRef, useState } from 'react'

import { Text } from '@/components/ui/typography/Text'
import { useObserver } from '@/utils/helpers'
import { scrollToSection } from '@/utils/scrollToSection'

import arrowRight2 from '/public/images/common/arrow-right-2.svg'

import styles from './index.module.scss'

export type TTitleTableOfContent = {
    name: string
    link: string
}
export default function Aside(props: { articleHeaders: TTitleTableOfContent[] }) {
    const [activeTitle, setActiveTitle] = useState<TTitleTableOfContent | null>(null)
    const [isFixed, setIsFixed] = useState(false)

    const intersectionSensorRef = useRef<HTMLDivElement>(null)

    useObserver(intersectionSensorRef, setIsFixed)

    const handleClick = (e: MouseEvent<HTMLAnchorElement>, anchor: TTitleTableOfContent) => {
        e.stopPropagation()
        setActiveTitle(anchor)
        scrollToSection(anchor.link)
    }
    return (
        <>
            <div ref={intersectionSensorRef} />
            <div
                className={`${styles.wrapper} ${cn({
                    [styles.fixedPosition]: isFixed,
                })}`}
            >
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
                                        [styles.itemTitle_active]:
                                            activeTitle && activeTitle.link === item.link,
                                    })}
                                    type="pL"
                                >
                                    {item.name}
                                </Text>
                                {activeTitle && activeTitle.link === item.link && (
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