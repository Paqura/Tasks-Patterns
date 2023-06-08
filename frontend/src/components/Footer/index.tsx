import cn from 'classnames'
import Image from 'next/image'

import { NavBlock, TNavBlockData } from '@/components/Footer/components/NavBlock'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

import logo from '/public/images/logo.svg'

export type TFooterData = {
    title: string
    copyright: string
    startYear: number
    products: TNavBlockData
    company: TNavBlockData
    social: TNavBlockData
}

type TProps = {
    className?: string
    footerData: TFooterData
}

export const Footer: React.FC<TProps> = ({ className, footerData }) => {
    const nowYear = new Date().getFullYear()
    const year =
        nowYear > footerData.startYear ? [footerData.startYear, nowYear].join('—') : String(nowYear)
    return (
        <footer className={cn(styles.wrapper, className)}>
            <div className={styles.info}>
                <div className={styles.head}>
                    <Text type="pM" className={styles.copyright}>
                        <mark>©</mark> {footerData.copyright}, {year}.
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

            <Image src={logo} alt="Positive Technologies" className={styles.logo} />
        </footer>
    )
}
