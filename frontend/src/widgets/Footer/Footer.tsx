import cn from 'classnames'
import Image from 'next/image'

import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'
import { NavBlock, TNavBlockData } from './ui/NavBlock'

export type TFooterData = {
    title: string
    copyright: string
    products: TNavBlockData
    company: TNavBlockData
    social: TNavBlockData
    logoImage: TImage | null
}

type TFooterProps = {
    className?: string
    footerData: TFooterData
}

export const Footer = ({ className, footerData }: TFooterProps) => {
    return (
        <footer className={cn(styles.wrapper, className)}>
            <div className={styles.info}>
                <div className={styles.head}>
                    <Text type="pM" className={styles.copyright}>
                        {footerData.copyright}
                    </Text>
                    <Heading level={2}>{footerData.title}</Heading>
                </div>
                <nav className={styles.nav}>
                    <NavBlock
                        title={footerData.products.title}
                        navItems={footerData.products.navItems}
                        className={styles.nav_col}
                    />
                    <NavBlock
                        title={footerData.company.title}
                        navItems={footerData.company.navItems}
                        className={styles.nav_col}
                    />
                    <NavBlock
                        title={footerData.social.title}
                        navItems={footerData.social.navItems}
                        className={styles.nav_col}
                    />
                </nav>
            </div>

            {footerData.logoImage && (
                <div>
                    <Image
                        className={styles.logo}
                        src={footerData.logoImage?.src}
                        alt={footerData.logoImage?.alt ?? ''}
                        width={footerData.logoImage?.width}
                        height={footerData.logoImage?.height}
                    />
                </div>
            )}
        </footer>
    )
}
