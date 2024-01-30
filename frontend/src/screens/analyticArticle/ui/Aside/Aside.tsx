import cn from 'classnames'
import Image from 'next/image'

import { Text } from '@/shared/ui/common/typography/Text'

import arrowRight2 from '/public/images/common/arrow-right-2.svg'

import { useAnchors } from '@/shared/ui/project/AnchorBar'

import styles from './index.module.scss'

export type TTitleTableOfContent = {
    name: string
    link: string
}

type TAsideProps = { articleHeaders: TTitleTableOfContent[] }

export const Aside = ({ articleHeaders }: TAsideProps) => {
    const { activeLink } = useAnchors()

    return (
        <div className={styles.wrapper}>
            {articleHeaders.map((item) => {
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
